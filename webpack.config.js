const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // режим разработки, который подключает локальный сервер автоматически и обновляет страницу при изменении кода
  entry: [
    '@babel/polyfill',
    './src/index.tsx' // входящий файл
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] // позволяет импортировать index файлы из файла без указания index, а только название компонента/файла
  },
  devtool: 'eval-source-map', // показывает ошибки в компонентах, а не в компилированном коде
  output: {
    path: path.resolve(__dirname, 'dist'), // куда сохраняется файл при сборке
    // filename: '[name].[hash].js' // гарантирует уникальное название файла при сборке, но вызывает ошибку роутинга при указании ID, так как невохожно указать название файла в index.html
    filename: 'bundle.js'
  },
  devServer: {
    port: 8091,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin() // чистит папку перед создание новой сборки (в данном случае папку dist),
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg)/,
        use: ['file-loader']
      },
      {
        test: /\.m?js$|\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // компилирует код в бабель
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // автоватический определяет, необходимые настройки, для компилирования в бабель под браузер
          }
        }
      },
      {
        test: /\.m?ts$|\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // загрузчик TypeScript выполняет только транспиляцию кода в JavaScript, но не проверяет его на ошибки типов
            }
          }
        ]
      }
    ]
  }
}
