function initPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();

    pushNotification.registerDevice({ projectid: "853066139173", appid : "40458-F523A" },
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );

    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;

        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }

        navigator.notification.alert(title);
    });

    // PushWoosh configuration

    // Call this to register for push notifications and retreive a deviceToken
    PushNotification.prototype.registerDevice = function(config, success, fail) {
        cordova.exec(success, fail, "PushNotification", "registerDevice", config ? [config] : []);
    };

    //sets multi notification mode on
    PushNotification.prototype.setMultiNotificationMode = function(success, fail) {
        cordova.exec(success, fail, "PushNotification", "setMultiNotificationMode", []);
    };

    //type: 0 default, 1 no sound, 2 always
    PushNotification.prototype.setSoundType = function(type, success, fail) {
        cordova.exec(success, fail, "PushNotification", "setSoundType", 2);
    };

    //type: 0 default, 1 no vibration, 2 always
    PushNotification.prototype.setVibrateType = function(type, success, fail) {
        cordova.exec(success, fail, "PushNotification", "setVibrateType", 2);
    };
}