var android_script = require('./disable_gradle_daemon_android');

module.exports = function(context) {
  var Q = context.requireCordovaModule('q');
  var platforms = context.requireCordovaModule('cordova-lib/src/cordova/util').listPlatforms(context.opts.projectRoot);

  var promises = [];

  if (platforms.indexOf('android') >= 0) {
    context.opts.daemon = false;
    promises.push(android_script(context, enableDaemon));
  }

  return Q.all(promises);
};
