export default class SessionService {
  signOut() {
    firebase.auth().signOut();
  }

  signIn(email, password, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(errorCallback);
  }

  signUp(email, password, errorCallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(errorCallback);
  }
}