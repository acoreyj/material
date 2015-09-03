Package.describe({
  name: 'jepperct:angular-material-cj',
  summary: ' A package to add Custom Material Design by CJ to Angular ',
  version: '0.11.0_2',
  git: 'https://github.com/acoreyj/material'
});

Package.onUse(function(api) {
  api.addFiles('dist/angular-material.css', 'client');
  api.addFiles('dist/angular-material.js', 'client');



});
