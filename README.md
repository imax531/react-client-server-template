# Todo List

### How to run

Using docker, run:

```
docker-compose up
```

### Directory Layout

```bash
.
├── /node_modules/                    # 3rd-party libraries and utilities
├── /dist/                            # All the generated files will go here, and will run from this folder
├── /src/                             # The source code of the application
│   ├── /client/                      # React app
│   ├── /server/                      # Express server app
│   ├── /shared/                      # The shared code between the client and the server
├── /assets/                          # images, css, jsons etc.
├── .eslintrc                         # es-lint configuration
├── .prettierec                       # prettier configuration
├── .gitignore                        # ignored git files and folders
├── .nvmrc                            # Force nodejs version
├── .env                              # (ignored) Can be used to override environment variables
├── index.js                          # The server's entry point
├── package.json                      # The list of 3rd party libraries and utilities
└── tsconfig-for-webpack-config.json  # using TypeScript for the webpack config file
├── README.md                         # This file
```

### Usage

- `npm run dev` - Client and server are in watch mode with source maps, opens [http://localhost:3000](http://localhost:3000)
- `npm run test` - Runs jest tests
- `npm run lint` - Runs es-lint
- `npm run build` - `dist` folder will include all the needed files, both client (Bundle) and server.
- `npm start` - Just runs `node ./dist/server/server.js`
- `npm start:prod` - sets `NODE_ENV` to `production` and then runs `node ./dist/server/server.js`. (Bypassing webpack proxy)
