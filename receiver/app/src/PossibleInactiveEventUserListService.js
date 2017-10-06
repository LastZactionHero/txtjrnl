import DatabaseService from './DatabaseService';
import Messages from './Messages';
import Moment from 'moment-timezone';

// Build a list of Users that may be eligable for an Inactive message
export default class PossibleInactiveEventUserListService {
  constructor(inactiveEvent, moment) {
    this._inactiveEvent = inactiveEvent;
    this._moment = moment;
  }

  find() {
    return new Promise( (resolve, reject) => {
      const database = DatabaseService.getDatabase();

      // Bail if the event does not fire at this minute
      if(this._moment.minute() != this._inactiveEvent.time.minute) { 
        reject();
        return;
      };

      // Find a list of timezones that match the event hour in local time
      const matchingTimezoneNames = Moment.tz.names().filter((tzName) => {
        return this._moment.tz(tzName).hour() == this._inactiveEvent.time.hour
      })
      console.log(matchingTimezoneNames)

      // Find anyone in a matching timezone timezone (Firebase does not have 'FIND IN ARRAY' selects)
      database.ref('preferences').once('value').then( (snapshot) => {
        const matchingUserPreferences = [];
        snapshot.forEach((preference) => {
          if(matchingTimezoneNames.indexOf(preference.val().timezone) != -1) {
            matchingUserPreferences.push(preference)
          }
        });
        resolve(matchingUserPreferences)
      });
    });
  }
}