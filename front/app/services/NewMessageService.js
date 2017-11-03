import DatabaseService from './DatabaseService';

export default {
  postNewMessage(user, message) {
    const database = DatabaseService.getDatabase();

    var newMessageRef = database.ref().child(`messages/${user.uid}`).push();
    newMessageRef.set({
      body: message,
      media: [],
      raw: null,
      created_at: (new Date()).toISOString()
    });
    mixpanel.track('Journaled', { source: 'app', message: message });
  }
}