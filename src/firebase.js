import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAvQUsC5iiktfL98_XDQUDa5KckBR5NXuk",
  authDomain: "flashsearch-98b2c.firebaseapp.com",
  projectId: "flashsearch-98b2c",
  storageBucket: "flashsearch-98b2c.appspot.com",
  messagingSenderId: "221710515563",
  appId: "1:221710515563:web:3c855d2ede0b1a7f45e02e",
  measurementId: "G-7891ZDHYSP"
};

// console.log('*** Environment ***', process.env.REACT_APP_ENV)
console.log('*** Firebase Config ***', firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: 'BI8CPdLNIkAjCCQzusvgwTaRjB0s4So1B24LZCkuTC6c6iiYh7g8wc2Hzoc8FrYVfbk9-q2hd5K8MJUgaAD58CM', serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
