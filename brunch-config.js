module.exports = {
  server: { 
    hostname: '0.0.0.0'
  },
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    templates: {
      joinTo: 'app.js'
    }
  },
  plugins: {
    babel: {
      presets: ['es2015']
    }
  }
}
