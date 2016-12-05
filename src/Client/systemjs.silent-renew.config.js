(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      'silent-renew': 'app',
      'json': 'npm:systemjs-plugin-json/json.js'
    },
    packages: {
      'silent-renew': {
          main: './silent-renew.js',
          defaultExtension: 'js'
      },
      'app/autenticacion': {
          main: './index.js',
          defaultExtension: 'js'
      }
    }
  });
})(this);
