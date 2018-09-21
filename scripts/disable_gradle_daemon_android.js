
// Get *Builder.js
function getBuilderScripts(context) {
  var targetFileArr = [];
  var deferred = context.requireCordovaModule('q').defer();
  var path = context.requireCordovaModule('path');
  var glob = context.requireCordovaModule('glob');

  var builderDir = path.join(context.opts.projectRoot, 'platforms/android/cordova/lib/builders');

  glob(`${builderDir}/*.js`, function(err, files) {
    if (err) {
      deferred.reject(err);
    } else {
      files.forEach(function(file) {
        var matches = file.match(/(.*).js/);
        if (matches) {
          targetFileArr.push({
            name: matches[1],
            path: file
          });
        }
      });

      deferred.resolve(targetFileArr);
    }
  });
  return deferred.promise;
}

module.exports = function(context, enable) {
  var fs = require('fs');
  var deferred = context.requireCordovaModule('q').defer();

  getBuilderScripts(context).then(function(targetFiles) {
    targetFiles.forEach(function(target) {
      var builder = fs.readFileSync(target.path, 'utf-8');
      var newBuilder = builder.replace(/'(-Dorg\.gradle\.daemon\=)\w+'/, `'$1${enable}'`);

      fs.writeFileSync(target.path, newBuilder, 'utf-8');
      deferred.resolve();
    });
  }).catch(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};
