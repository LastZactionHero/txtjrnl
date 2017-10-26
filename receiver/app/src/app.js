import Express from 'express'
import BodyParser from 'body-parser'
import TwilioMessageParser from './TwilioMessageParser'
import Twilio from 'twilio'
import WelcomeMessageSender from './WelcomeMessageSender'
import DatabaseService from './DatabaseService';
import InactiveEventService from './InactiveEventService';
import DormantEventService from './DormantEventService';
import Schedule from 'node-schedule';
import Moment from 'moment-timezone';
import Logger from './Logger';

const database = DatabaseService.getDatabase();

Logger.instance().info('Starting Receiver App');

// Send Welcome Texts
const preferencesRef = database.ref('preferences/');
const welcomeResponder = (firebaseData) => {
  const data = firebaseData.val();
  const phoneNumberDefined = data.phoneNumberFormatted && data.phoneNumberFormatted.length > 0
  if(phoneNumberDefined && !data.sentWelcomeNotification) {
    Logger.instance().info('User needs a welcome notification');
    Logger.instance().info(firebaseData.key);

    const userPreferenceRef = database.ref(`preferences/${firebaseData.key}`);
    userPreferenceRef.update({sentWelcomeNotification: true}).then(() => {
      Logger.instance().info("Preferences updated to indicate welcome notification sent");

      const welcomeSender = new WelcomeMessageSender(data.phoneNumberFormatted);
      welcomeSender.send()
    })
  }
}
preferencesRef.on('child_added', welcomeResponder);
preferencesRef.on('child_changed', welcomeResponder);


// Schedule Inactive Messages
var idleEventServiceJob = Schedule.scheduleJob('*/15 * * * *', () => {
  Logger.instance().info("Running InactiveEventService")
  var inactiveEventService = new InactiveEventService();
  inactiveEventService.run(Moment().utc());
});

// Schedule Dormant Messages
var dormantEventServiceJob = Schedule.scheduleJob('0 * * * *', () => {
  Logger.instance().info("Running DormantEventService")
  var service = new DormantEventService();
  service.run(Moment().utc());
});




// Init Express App
const app = Express()
app.use(BodyParser.urlencoded({ extended: true }));

// SMS Reciever
app.post('/sms', function (req, res) {
  res.status(204).send();
  Logger.instance().info(req.body);

  const message = new TwilioMessageParser(req.body);
  Logger.instance().info(message.phoneNumber);
  Logger.instance().info(message.body);
  Logger.instance().info(message.media);

  var ref = database.ref("preferences");
  ref.orderByChild('phoneNumberFormatted').equalTo(message.phoneNumber).limitToFirst(1).on("child_added", function(snapshot) {
    const userKey = snapshot.key;
    Logger.instance().info(`Posting for User with key: ${userKey}`);

    if(!userKey || userKey.length == 0) {
      // TODO: Log an error!
      return;
    }

    // Determine if this was in response to a recent inactivity prompt
    let recentPrompt = null;
    const lastPrompted = snapshot.val().lastPrompted;
    if(lastPrompted) {
      const lastPromptedAt = Moment(lastPrompted.lastPromptedAt);
      const now = Moment();
      const minutesSinceLastPrompted = (now - lastPromptedAt) / (1000 * 60);
      const recentPromptThreshold = 30; // If message is received within 30 minutes of a prompt
      if(minutesSinceLastPrompted < recentPromptThreshold) {
        recentPrompt = lastPrompted;
      }
    }


    var newMessageRef = database.ref().child(`messages/${userKey}/`).push();
    newMessageRef.set({
      body: message.body,
      media: message.media,
      raw: message.data,
      created_at: (new Date()).toISOString(),
      recentPrompt: recentPrompt
    });

  });  
});

app.listen(3333, '0.0.0.0');