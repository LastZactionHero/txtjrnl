import firebaseAdmin from 'firebase-admin'

export default {
  _database: null,
  _firebaseAdmin: null,

  getDatabase() {
    if(!this._database) {
      var serviceAccount = require("/root/firebase-key.json");
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: "https://txtjrnl.firebaseio.com"
      });
      this._database = firebaseAdmin.database(); 
    }
    return this._database;
  }
}