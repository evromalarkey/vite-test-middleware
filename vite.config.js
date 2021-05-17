import {resolve} from "path";

const middleware = () => {
    return {
        name: 'middleware',
        apply: 'serve',
        configureServer(viteDevServer) {
            return () => {
                viteDevServer.middlewares.use(async (req, res, next) => {
                    if (!req.originalUrl.endsWith(".html") && req.originalUrl !== "/") {
                        req.url = req.originalUrl + ".html";
                    }

                    next();
                });
            };
        }
    }
}

export default {
    plugins: [middleware()],
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