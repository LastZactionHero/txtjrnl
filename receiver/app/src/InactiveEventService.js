import Moment from 'moment-timezone';
import Messages from './Messages';
import PossibleInactiveEventUserListService from './PossibleInactiveEventUserListService';
import DatabaseService from './DatabaseService';
import TwilioMessageSender from './TwilioMessageSender';
import LastPromptedService from './LastPromptedService';
import Logger from './Logger';

export default class InactiveEventService {
  run(moment) {
    Logger.instance().info(moment);

    Messages.inactive().forEach((inactiveEventMessage) => {
      Logger.instance().info("Checking Event: ");
      Logger.instance().info(inactiveEventMessage);

      var possibleInactiveService = new PossibleInactiveEventUserListService(inactiveEventMessage, moment);
      possibleInactiveService.find().then( (userPreferencesSnapshot) => {
        Logger.instance().info(`This event could apply to ${userPreferencesSnapshot.length} user(s)`);
        this._notifyIfInactive(moment, userPreferencesSnapshot, inactiveEventMessage);
      }).catch( (e) => { Logger.instance().info('Event not running now.'); Logger.instance().info(e) } );
    });
  }

  _notifyIfInactive(moment, userPreferencesSnapshot, inactiveEventMessage) {
    // For each user that could be notified, determine the number of hours since their last posts
    userPreferencesSnapshot.forEach( (preference) => {
      this._hoursSinceLastPost(moment, preference).then( (inactiveHours) => { 
        Logger.instance().info(`Hours Since Last Post: ${inactiveHours}`);
        this._sendNotificationIfWithinRange(inactiveHours, preference, inactiveEventMessage);
      }).catch( (e) => {Logger.instance().info(e) });
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
    // const database = DatabaseService.getDatabase();

    // let sendIdleMessagesToday = preference.val().sendIdleMessagesToday;

    // Temporarily defaulting this to true, regardless of post activity
    let sendIdleMessagesToday = true;

    // if(inactiveEventMessage.firstMessageOfTheDay &&
    //    ( inactiveHours >= 48 && inactiveHours < 72 ||
    //     inactiveHours >= 96 && inactiveHours < 120 ||
    //     inactiveHours >= 144 && inactiveHours < 168 ) ) {
    //   const ref = database.ref(`preferences/${preference.key}`);
    //   ref.update({ sendIdleMessagesToday: true });
    //   sendIdleMessagesToday = true;
    // }

    if(sendIdleMessagesToday) {
      const sender = new TwilioMessageSender();
      sender.send(preference.val().phoneNumberFormatted, inactiveEventMessage.message)

      const lastPromptedService = new LastPromptedService(preference);
      lastPromptedService.setLastPrompted(Moment(), inactiveEventMessage);
    }

    // if(inactiveEventMessage.lastMessageOfTheDay) {
    //   const ref = database.ref(`preferences/${preference.key}`);
    //   ref.update({ sendIdleMessagesToday: false });
    // }
  }

}