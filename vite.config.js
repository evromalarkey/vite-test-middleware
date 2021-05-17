import {resolve} from "path"

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
    plugins: [middleware(), {
        name: 'html-reload',
        handleHotUpdate({ file, server }) {
            if (file.endsWith('.html')) {
                server.ws.send({
                    type: 'full-reload',
                    path: '*',
                });
            }
        },
    }],
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