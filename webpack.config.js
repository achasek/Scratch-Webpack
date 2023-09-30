const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
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