Package.describe({
  name: 'jepperct:angular-material-cj',
  summary: ' A package to add Material Design to Angular ',
  version: '"0.11.0-rc1-master-ffbcff3-cj',
  git: 'https://github.com/acoreyj/material'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  //JS Files
  api.addFiles('dist/angular-material.css', 'client');
  api.addFiles('dist/angular-material.js', 'client');



});
