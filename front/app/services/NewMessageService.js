import DatabaseService from './DatabaseService';

export default {
  postNewMessage(user, message) {
    const database = DatabaseService.getDatabase();

    var newMessageRef = database.ref().child('messages').push();
    newMessageRef.set({
      uid: user.uid,
      body: message,
      media: [],
      raw: null,
      created_at: (new Date()).toISOString()
    });
  }
}