import DatabaseService from './DatabaseService';
import DormantMessageSender from './DormantMessageSender';
import Moment from 'moment-timezone';
import Logger from './Logger';

export default class DormantEventService {
  run(momentUTC) {
    Logger.instance().info("RUN!")

    const currentHourUTC = momentUTC.hour();
    Logger.instance().info(`Current Hour, UTC: ${currentHourUTC}`)
    const eventHourLocal = 10; // Run at 10AM

    // Find any timezones that match the event hour in local time
    const matchingTimezoneNames = Moment.tz.names().filter((tzName) => {
      return momentUTC.tz(tzName).hour() == eventHourLocal;
    })
    Logger.instance().info(matchingTimezoneNames)

    // Find anyone in a matching timezone timezone (Firebase does not have 'FIND IN ARRAY' selects)
    // Loop through all preferences for anyone that receives notifications
    const database = DatabaseService.getDatabase();
    database.ref('preferences').orderByChild('notifications').equalTo(true).once('value').then( (snapshot) => {
      snapshot.forEach((preference) => {
        if(matchingTimezoneNames.indexOf(preference.val().timezone) != -1) {
          // Send a message if user in a matching timezone
          this._hoursSinceLastPost(momentUTC, preference).then((hoursInactive) => {
            Logger.instance().info(`Hours since last post: ${hoursInactive}`);
            this._sendNotificationIfWithinRange(hoursInactive, preference);
          }).catch( (e) => Logger.instance().info(e) );
        }
      });      
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

  _sendNotificationIfWithinRange(hoursInactive, preference) {
    if(hoursInactive >= 240 && hoursInactive < 264) {
      const sender = new DormantMessageSender(preference.val().phoneNumberFormatted);
      sender.send();
    }
  }
}