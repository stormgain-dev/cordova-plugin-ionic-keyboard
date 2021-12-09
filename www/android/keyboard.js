var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');

var Keyboard = function () {};

Keyboard.fireOnShow = function (height, visibleAreaHeight) {
    Keyboard.isVisible = true;
    cordova.fireWindowEvent('keyboardDidShow', {
        'keyboardHeight': height, visibleAreaHeight: visibleAreaHeight,
    });

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardshow', {
        'keyboardHeight': height, visibleAreaHeight: visibleAreaHeight,
    });
};

Keyboard.fireOnHide = function () {
    Keyboard.isVisible = false;
    cordova.fireWindowEvent('keyboardDidHide');

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardhide');
};

Keyboard.fireOnHiding = function () {
    cordova.fireWindowEvent('keyboardWillHide');
};

Keyboard.fireOnShowing = function (height, visibleAreaHeight) {
    cordova.fireWindowEvent('keyboardWillShow', {
        'keyboardHeight': height, visibleAreaHeight: visibleAreaHeight,
    });
};

Keyboard.hideFormAccessoryBar = Keyboard.hideKeyboardAccessoryBar = function (hide) {
    console.warn("Keyboard.hideKeyboardAccessoryBar() not supported in Android");
};

Keyboard.hide = function () {
    exec(null, null, "CDVIonicKeyboard", "hide", []);
};

Keyboard.show = function () {
    exec(null, null, "CDVIonicKeyboard", "show", []);
};

Keyboard.disableScroll = function (disable) {
    console.warn("Keyboard.disableScroll() not supported in Android");
};

Keyboard.setResizeMode = function (mode) {
    console.warn("Keyboard.setResizeMode() not supported in Android");
}

Keyboard.setKeyboardStyle = function(style) {
    console.warn("Keyboard.setKeyboardStyle() not supported in Android");
};

channel.onCordovaReady.subscribe(function () {
    exec(success, null, 'CDVIonicKeyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if (action === 'S') {
            var heights = msg.substr(1).split("_");
            var keyboardHeight = parseInt(heights[0]), visibleAreaHeight = parseInt(heights[1]);
            Keyboard.fireOnShowing(keyboardHeight, visibleAreaHeight);
            Keyboard.fireOnShow(keyboardHeight, visibleAreaHeight);

        } else if (action === 'H') {
            Keyboard.fireOnHiding();
            Keyboard.fireOnHide();
        }
    }
});


Keyboard.isVisible = false;

module.exports = Keyboard;
