Package.describe({
  name: 'jepperct:angular-material-cj',
  summary: ' A package to add Custom Material Design by CJ to Angular ',
  version: '1.1.0_1',
  git: 'https://github.com/acoreyj/material'
});

Package.onUse(function(api) {
  api.addFiles('dist/angular-material.css', 'client');
  api.addFiles('dist/angular-material.js', 'client');



});
