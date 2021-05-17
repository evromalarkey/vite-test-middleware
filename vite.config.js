import {resolve} from "path"
import liveReload from 'vite-plugin-live-reload'

const middleware = () => {
    return {
        name: 'middleware',
        apply: 'serve',
        configureServer(viteDevServer) {
            return () => {
                viteDevServer.middlewares.use(async (req, res, next) => {
                    if (!req.originalUrl.endsWith(".html") && req.originalUrl !== "/") {
                        req.url = `` + req.originalUrl + ".html";
                    } else if (req.url === "/index.html") {
                        req.url = `` + req.url;
                    }

                    next();
                });
            };
        }
    }
}

export default {
    plugins: [middleware(), liveReload('src/templates/*.html', { alwaysReload: true, log: false, root: process.cwd() })],
    server: {
        open: "/"
    },
    root: "src/templates",
    publicDir: resolve(process.cwd(), 'public'),
    resolve: {
        alias: {
            '/src': resolve(process.cwd(), 'src')
        }
    },
    build: {
        outDir: resolve(process.cwd(), 'dist'),
        rollupOptions: {
            input: {
                main: resolve(process.cwd(), 'src/templates/index.html')
            }
        }
    }
}