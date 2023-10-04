const path = require('path')
const webpack = require('webpack')

// CAN ACCESS PROD build locally via CLI command below
// npx static-server
// default on http://localhost:9080

const config = (env, argv) => {
  // we can set webpack to act differently depending on the argv.mode. We can also define constant behavior across all argv.modes

  console.log("argv.mode:", argv.mode)
  console.log("argv obj:", argv)
  console.log("env:", env)
  // consoles the below commented out code
  // argv.mode: production
  // argv obj: {
  //   mode: 'production',
  //   env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true }
  // }
  // env: { WEBPACK_BUNDLE: true, WEBPACK_BUILD: true }

  // setting a global variable, or constant behavior, accessible by dev, test, or production mode
  const backend_url = argv.mode === 'production'
  ? 'https://notes2023.fly.dev/api/notes'
  : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      // allows for app to be ran on localhost:3000
      port: 3000,
    },
    // this allows you to use debuggers and to see where the bug is in your actual pre-bundled code, not the bundled and unreadable code
    devtool: 'source-map',
    // fixed a warning about production build exceeding size limitations. Limits source maps to dev mode only
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

// Node.js's Module Syntax

module.exports = config

// --------------------------------------

// NOTE: We could init config as an object directly,
// but eventually, we need this to be a function, so we opt for the above approach

// const config = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'main.js'
//   }
// }

// module.exports = config