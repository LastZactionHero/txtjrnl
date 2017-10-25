import DatabaseService from './DatabaseService';

// Check and set the latest automated Txtjrnl prompt received by the User
export default class LastPromptedService {

  // preference - User preference to check or modify
  constructor(preference) {
    this.preference = preference;
  }

  setLastPrompted(moment, message) {
    const database = DatabaseService.getDatabase();

    const ref = database.ref(`preferences/${this.preference.key}`);
    ref.update({ 
      lastPrompted: {
        message: message,
        lastPromptedAt: moment.toISOString()
      }
    });
  }
}