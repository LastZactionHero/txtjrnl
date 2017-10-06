import Moment from 'moment';
import Messages from './Messages';
import PossibleInactiveEventUserListService from './PossibleInactiveEventUserListService';
import DatabaseService from './DatabaseService';
import TwilioMessageSender from './TwilioMessageSender';

export default class InactiveEventService {
  run(moment) {
    console.log(moment);

    Messages.inactive().forEach((inactiveEventMessage) => {
      console.log("Checking Event: ");
      console.log(inactiveEventMessage);

      var possibleInactiveService = new PossibleInactiveEventUserListService(inactiveEventMessage, moment);
      possibleInactiveService.find().then( (userPreferencesSnapshot) => {
        console.log("This event could apply to some users:")
        console.log(userPreferencesSnapshot.val());
        this._notifyIfInactive(moment, userPreferencesSnapshot, inactiveEventMessage);
      }).catch( (e) => { console.log('Event not running now.'); console.log(e) } );
    });
  }

  _notifyIfInactive(moment, userPreferencesSnapshot, inactiveEventMessage) {
    // For each user that could be notified, determine the number of hours since their last posts
    userPreferencesSnapshot.forEach( (preference) => {
      this._hoursSinceLastPost(moment, preference).then( (inactiveHours) => { 
        console.log(`Hours Since Last Post: ${inactiveHours}`);
        this._sendNotificationIfWithinRange(inactiveHours, preference, inactiveEventMessage);
      }).catch( (e) => {console.log(e) });
    });
  }

  _hoursSinceLastPost(moment, preference) {
    const database = DatabaseService.getDatabase();

    return new Promise((resolve, reject) => {
      database.ref(`messages/${preference.key}`)
      .orderByChild('created_at')
      .limitToLast(1)
      .once('value')
      .then( (messagesSnapshot) => { 
        messagesSnapshot.forEach((message) => {
          var lastPostAt = Moment(message.child('created_at').val());
          var hoursSinceLastPost = (moment - lastPostAt) / (60 * 60 * 1000);
          resolve(hoursSinceLastPost);
          return;
        });
        reject(null);
      });
    });
  }

  _sendNotificationIfWithinRange(inactiveHours, preference, inactiveEventMessage) {
    const database = DatabaseService.getDatabase();

    let sendIdleMessagesToday = preference.val().sendIdleMessagesToday;

    if(inactiveEventMessage.firstMessageOfTheDay &&
       ( inactiveHours >= 48 && inactiveHours < 72 ||
        inactiveHours >= 96 && inactiveHours < 120 ||
        inactiveHours >= 144 && inactiveHours < 168 ) ) {
      const ref = database.ref(`preferences/${preference.key}`);
      ref.update({ sendIdleMessagesToday: true });
      sendIdleMessagesToday = true;
    }

    if(sendIdleMessagesToday) {
      const sender = new TwilioMessageSender();
      sender.send(preference.val().phoneNumberFormatted, inactiveEventMessage.message)
    }

    if(inactiveEventMessage.lastMessageOfTheDay) {
      const ref = database.ref(`preferences/${preference.key}`);
      ref.update({ sendIdleMessagesToday: false });
    }
  }

}