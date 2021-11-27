import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const signedInUser = result.user
            storeAuthToken();
            return signedInUser
        }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage
        });
}

export const handlePhoneSignIn = (user) => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumber = user.phoneNumber;
    return firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            let code = prompt('Enter your code', '');
            if (code === null)
                return;
            return confirmationResult.confirm(code)
                .then(result => {
                    if (user.displayName)
                        updateUserName(user.displayName)
                    return result;
                })
        }).catch((error) => {
            console.log(error);
        });
}
const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
}

export const createUserWithEmailAndPassword = (displayName, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user
            newUserInfo.error = '';
            newUserInfo.success = true
            updateUserName(displayName)
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false
            return newUserInfo
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user
            newUserInfo.error = '';
            newUserInfo.success = true
            return newUserInfo
        })
        .catch((error) => {
            const newUserInfo = {}

            newUserInfo.error = error.message;
            newUserInfo.success = false
            return newUserInfo
        });
}

const updateUserName = (displayName) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: displayName,
    }).then(function () {
        // console.log('username updated successfully')
    }).catch(function (error) {
        // console.log(error)
    });
}
