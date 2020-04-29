import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBpTL6auRiTAMsGwAibOA01TgARYsy_0hE",
  authDomain: "churchglobe-870e3.firebaseapp.com",
  databaseURL: "https://churchglobe-870e3.firebaseio.com",
  projectId: "churchglobe-870e3",
  storageBucket: "churchglobe-870e3.appspot.com",
  messagingSenderId: "634144024751",
  appId: "1:634144024751:web:18e30ebea00468eae90c5a"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;