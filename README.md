# cordova-plugin-disable-gradle-daemon
Disable gradle daemon


## How to Use

Install the plugin by fetching the dependencies

    $ cordova plugin add https://github.com/tkikuchi2000/cordova-plugin-disable-gradle-daemon.git#1.1.0 --variable ENABLE_DAEMON=false

Install Android platform

    cordova platform add android
    
Run the code

    cordova prepare android

`platforms/android/cordova/lib/buildes/*.js` is modified like this:

    $ grep gradle.daemon platforms/android/cordova/lib/builders/*.js
    platforms/android/cordova/lib/builders/GradleBuilder.js:    args.push('-Dorg.gradle.daemon=false');
    platforms/android/cordova/lib/builders/StudioBuilder.js:    args.push('-Dorg.gradle.daemon=false');
