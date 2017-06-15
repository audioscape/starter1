var config = {
    apiKey: "AIzaSyD6wI3vdQEvB-vOC3AUZOJEQW73saMJ8zc",
    authDomain: "georgia-firebase.firebaseapp.com",
    databaseURL: "https://georgia-firebase.firebaseio.com",
    projectId: "georgia-firebase",
    storageBucket: "georgia-firebase.appspot.com",
    messagingSenderId: "907022003092"
};
var configDevServer = {
    apiKey: "AIzaSyCFmTZWWNmO7PzGC0jjYbqiql5o8DKZQss",
    authDomain: "guard-economic-impact-model.firebaseapp.com",
    databaseURL: "https://guard-economic-impact-model.firebaseio.com",
    storageBucket: "guard-economic-impact-model.appspot.com",
    messagingSenderId: "236587342036"
};

function initializeFirebase(attempts) {
   if (attempts >= 100) {
        console.log("Unable to load firebase.js: " + attempts + " attempts.");
        return;
      }
   if (typeof firebase == "undefined") {
      initializeFirebaseAgain(attempts+1)
      return;
   }
   firebase.initializeApp(config);
}
initializeFirebase(1);
function initializeFirebaseAgain(attempts) {
   setTimeout(function() {
     initializeFirebase(attempts); //Try again
   }, 100);
 }