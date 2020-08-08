module.exports = {
  pwa: {
    themeColor: '#4aaeff',
    name: 'Vue Weather Dashboard',
  },
  publicPath: '/vue-weather-conditions',
  pages:{
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Weather Conditions',
    }
  }
}