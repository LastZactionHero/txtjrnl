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
    },
    stylesheets: {
      joinTo: {
        'app.css': 'app/styles/main.scss'
      }
    },
  },
  plugins: {
    babel: {
      presets: ['es2015']
    },
    plugins: {
      sass: {
        mode: 'ruby'
      }
    }
  }
}
