import Logger from './Logger';
import firebaseAdmin from 'firebase-admin'

export default {
  _database: null,
  _firebaseAdmin: null,

  getDatabase() {
    const databaseURL = process.env.FIREBASE_DATABASE_URL;
    Logger.instance().info(`Connecting to: ${databaseURL}`);

    if(!this._database) {
      var serviceAccount = require("/root/firebase-key.json");
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: databaseURL
      });
      this._database = firebaseAdmin.database(); 
    }
    return this._database;
  }
}