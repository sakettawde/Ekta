import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Rebase from 're-base'

let app = firebase.initializeApp({
    apiKey: "AIzaSyC1tR8gTl-OT8h9vHSyKKtT9ga3xzNS1wI",
    authDomain: "ekta-pune.firebaseapp.com",
    databaseURL: "https://ekta-pune.firebaseio.com",
    projectId: "ekta-pune",
    storageBucket: "ekta-pune.appspot.com",
    messagingSenderId: "491852058752"
});

export const auth = firebase.auth
let db = firebase.database(app);
export let base = Rebase.createClass(db)