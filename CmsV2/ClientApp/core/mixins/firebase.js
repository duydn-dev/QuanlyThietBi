import firebase from 'firebase/app'
import 'firebase/messaging'
import Vue from 'vue';


firebase.initializeApp({
    apiKey: window.firebaseApiKey || '0',
    authDomain: window.firebaseAuthDomain || '0',
    // databaseURL: 'https:/ firebaseio.com',
    projectId: window.firebaseProjectId || '0',
    // storageBucket: 'bright-torus-246115.appspot.com',
    messagingSenderId: window.firebaseMessagingSenderId || '0',
    appId: window.firebaseAppId || '0'
    // measurementId: 'G-measurement-id'
});

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
let fireBaseMessaging = null;
console.log(firebase.messaging.isSupported());
if (firebase.messaging.isSupported()) {
    fireBaseMessaging = firebase.messaging();
}

Vue.mixin({
    methods: {
        fireBaseGetToken() {
            return new Promise((resolve, reject) => {
                if (!fireBaseMessaging)
                    return reject(err);

                fireBaseMessaging.getToken()
                    .then(currentToken => {
                        if (currentToken) {
                            localStorage.setItem(this.CONSTANTS.FIREBASE_TOKEN, currentToken);
                            return resolve(currentToken);
                        } else {
                            // Show permission request.
                            console.log('No Instance ID token available. Request permission to generate one.');
                            // Show permission UI.
                            // updateUIForPushPermissionRequired();
                            //this.setTokenSentToServer(false);

                            return reject('No Instance ID token available. Request permission to generate one.');
                        }
                    })
                    .catch(err => {
                        console.log('An error occurred while retrieving token. ', err);
                        //showToken('Error retrieving Instance ID token. ', err);
                        // this.setTokenSentToServer(false);
                        return reject(err);
                    });
            });
        },
        fireBaseRemoveToken(token) {
            return new Promise((resolve, reject) => {
                this.$http({
                    data: {
                        m: 'FCMToken',
                        fn: 'remove',
                        token: token
                    }
                })
                    .then(response => {
                        localStorage.removeItem(this.CONSTANTS.FIREBASE_TOKEN);
                        resolve(response)
                    })
                    .catch(ex => {
                        return reject(ex);
                    });
            });
        },
        initFireBase() {
            firebase.initializeApp({
                apiKey: this.appSettings.configs.firebaseApiKey,
                authDomain: this.appSettings.configs.firebaseAuthDomain,
                // databaseURL: 'https://bright-torus-246115.firebaseio.com',
                projectId: this.appSettings.configs.firebaseProjectId,
                // storageBucket: 'bright-torus-246115.appspot.com',
                messagingSenderId: this.appSettings.configs.firebaseMessagingSenderId,
                appId: this.appSettings.configs.firebaseAppId
                // measurementId: 'G-measurement-id'
            });
        }
    },
    computed: {
        fireBaseMessaging() {
            if (firebase.messaging.isSupported())
                return fireBaseMessaging;

            return null;

        },
    },

});