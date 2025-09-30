// static/login.js

// Firebase Config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyAFGuZOXPD7TdhgllaZJo9uMBR0ke3gjQo",
  authDomain: "yt-script-railway.firebaseapp.com",
  projectId: "yt-script-railway",
  storageBucket: "yt-script-railway.firebasestorage.app",
  messagingSenderId: "1076735009213",
  appId: "1:1076735009213:web:c9c6d77fd437f95653f2d4",
  measurementId: "G-60DGQY2JHK"
};

// Firebase Config


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google Sign-In
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => result.user.getIdToken())
        .then(idToken => {
            return fetch('/sessionLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });
        })
        .then(response => {
            if (response.ok) window.location.href = "/hub";
            else throw new Error('Login failed');
        })
        .catch(error => {
            console.error('Google Sign-In Error:', error);
            document.getElementById('error-message').textContent = 'Google login failed';
        });
}

// Email/Password Sign-In
function loginWithEmailPassword() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        document.getElementById('error-message').textContent = 'Please enter both email and password.';
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => result.user.getIdToken())
        .then(idToken => {
            return fetch('/sessionLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });
        })
        .then(response => {
            if (response.ok) window.location.href = "/hub";
            else throw new Error('Login failed');
        })
        .catch(error => {
            console.error('Email Login Error:', error);
            document.getElementById('error-message').textContent = 'Invalid email or password.';
        });
}
