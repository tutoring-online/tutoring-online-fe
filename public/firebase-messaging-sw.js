// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyADawzoe9-MK9tQTOXLeDEAhigb9TfW4Gc",
    authDomain: "tutoring-online-e3711.firebaseapp.com",
    projectId: "tutoring-online-e3711",
    storageBucket: "tutoring-online-e3711.appspot.com",
    messagingSenderId: "17449877817",
    appId: "1:17449877817:web:9ee74913cd2a2aad73a8e8",
    measurementId: "G-72VVMQTTGE",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload?.data?.message;
  const notificationOptions = {
    body: payload?.data?.message,
    icon: "./apple-icon.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});