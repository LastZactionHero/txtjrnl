import DatabaseService from './DatabaseService';
import ErrorHandler from './ErrorHandler';

export default {
  postNewMessage(user, message) {
    const database = DatabaseService.getDatabase();

    var newMessageRef = database.ref().child(`messages/${user.uid}`).push();
    newMessageRef.set({
      body: message,
      media: [],
      raw: null,
      created_at: (new Date()).toISOString()
    }).catch( (error) => {
      ErrorHandler.handleError(error);
    });
    mixpanel.track('Journaled', { source: 'app', message: message });
  }
}