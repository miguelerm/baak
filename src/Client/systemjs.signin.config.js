(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      signin: 'app',
      'json': 'npm:systemjs-plugin-json/json.js'
    },
    packages: {
      signin: {
          main: './signin.js',
          defaultExtension: 'js'
      },
      'app/autenticacion': {
          main: './index.js',
          defaultExtension: 'js'
      }
    }
  });
})(this);
