// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');
importScripts('http://localhost:1991/FileBaseConfig.ashx');


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
// firebase.initializeApp({
//     apiKey: 'AIzaSyDTAJ50kBzkIR6RcnNKlNbus5UaUuHEhAs',
//     authDomain: 'bright-torus-246115.firebaseapp.com',
//     // databaseURL: 'https://bright-torus-246115.firebaseio.com',
//     projectId: 'bright-torus-246115',
//     // storageBucket: 'bright-torus-246115.appspot.com',
//     messagingSenderId: '394936780066',
//     appId: '1:394936780066:web:3ec30dfa8874fdcd00117b'
//     // measurementId: 'G-measurement-id'
// });

firebase.initializeApp({
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    // databaseURL: 'https:/ firebaseio.com',
    projectId: firebaseProjectId,
    // storageBucket: 'bright-torus-246115.appspot.com',
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId
    // measurementId: 'G-measurement-id'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();

    // function log(){
    //     console.log("123213213");
    // }

    messaging.setBackgroundMessageHandler(function (payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const notificationTitle = 'Background Message Title';
        const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png'
        };
        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
}