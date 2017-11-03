import InactiveEventService from '../src/InactiveEventService';
import DatabaseService from '../src/DatabaseService';
import Moment from 'moment-timezone';
import Messages from '../src/Messages';

console.log('Hello!')

const database = DatabaseService.getDatabase();

database.ref('preferences/bUQfuBFti8brVWAYUQo8Rhs85ev2').once('value').then( (preference) => {
  console.log(preference.val());

  const inactiveEventService = new InactiveEventService();
  const message = Messages.inactive()[2];
  inactiveEventService._sendNotificationIfWithinRange(10, preference, message);
});