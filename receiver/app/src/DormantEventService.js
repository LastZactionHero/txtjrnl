import DatabaseService from './DatabaseService';
import DormantMessageSender from './DormantMessageSender';
import Moment from 'moment';

export default class DormantEventService {
  run(momentUTC) {
    console.log("RUN!")

    const currentHourUTC = momentUTC.hour();
    console.log(`Current Hour, UTC: ${currentHourUTC}`)
    const eventHourLocal = 10; // Run at 10AM

    let timezoneOffset = eventHourLocal - currentHourUTC;
    if(timezoneOffset > 12) { timezoneOffset = timezoneOffset - 24 }
    const timezoneStr = timezoneOffset > 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;
    console.log(`Message applies to users with timezone offset: ${timezoneOffset}`);

    // Find users in this timezone
    const database = DatabaseService.getDatabase();
    database.ref('preferences').orderByChild('timezone').equalTo(timezoneStr).once('value').then( (snapshot) => {
      snapshot.forEach((preference) => {
        this._hoursSinceLastPost(momentUTC, preference).then((hoursInactive) => {
          console.log(`Hours since last post: ${hoursInactive}`);
          this._sendNotificationIfWithinRange(hoursInactive, preference);
        }).catch( (e) => console.log(e) );
      })
      console.log(snapshot.val())
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