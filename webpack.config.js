module.exports = {
  entry: __dirname + '/index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel'
      }
    ]
  }
}
