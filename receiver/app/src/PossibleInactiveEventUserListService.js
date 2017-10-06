import DatabaseService from './DatabaseService';
import Messages from './Messages';

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

      // Determine the timezone in which this message would show
      // Build a string, e.g. +5, -8
      const currentHourUTC = this._moment.hour();
      console.log(`Current Hour, UTC: ${currentHourUTC}`)
      const eventHourLocal = this._inactiveEvent.time.hour;
      console.log(`Event Hour, Local: ${eventHourLocal}`)

      let timezoneOffset = eventHourLocal - currentHourUTC;
      if(timezoneOffset > 12) { timezoneOffset = timezoneOffset - 24 }

      const timezoneStr = timezoneOffset > 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;
      console.log(`Message applies to users with timezone offset: ${timezoneOffset}`);

      // Get an array of UIDs 
      database.ref('preferences').orderByChild('timezone').equalTo(timezoneStr).once('value').then( (snapshot) => {
        resolve(snapshot);
      });
    });
  }
}