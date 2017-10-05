import Express from 'express'
import BodyParser from 'body-parser'
import TwilioMessageParser from './TwilioMessageParser'
import firebaseAdmin from 'firebase-admin'
import Twilio from 'twilio'
import WelcomeMessageSender from './WelcomeMessageSender'

// Firebase Admin Setup
var serviceAccount = require("/root/firebase-key.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://txtjrnl.firebaseio.com"
});

// Send Welcome Texts
const preferencesRef = firebaseAdmin.database().ref('preferences/');
const welcomeResponder = (firebaseData) => {
  const data = firebaseData.val();
  const phoneNumberDefined = data.phoneNumberFormatted && data.phoneNumberFormatted.length > 0
  if(phoneNumberDefined && !data.sentWelcomeNotification) {
    console.log("User needs a welcome notification")
    console.log(firebaseData.key)


    const userPreferenceRef = firebaseAdmin.database().ref(`preferences/${firebaseData.key}`);
    userPreferenceRef.update({sentWelcomeNotification: true}).then(() => {
      console.log("Preferences updated to indicate welcome notification sent")

      const welcomeSender = new WelcomeMessageSender(data.phoneNumberFormatted);
      welcomeSender.send()
    })
  }
}
preferencesRef.on('child_added', welcomeResponder);
preferencesRef.on('child_changed', welcomeResponder);


// Init Express App
const app = Express()
app.use(BodyParser.urlencoded({ extended: true }));

// SMS Reciever
app.post('/sms', function (req, res) {
  res.status(204).send();

  const message = new TwilioMessageParser(req.body);
  console.log(message.phoneNumber);
  console.log(message.body);
  console.log(message.media);

  var ref = firebaseAdmin.database().ref("preferences");
  ref.orderByChild('phoneNumberFormatted').equalTo(message.phoneNumber).limitToFirst(1).on("child_added", function(snapshot) {
    const userKey = snapshot.key;
    console.log(`Posting for User with key: ${userKey}`);

    if(!userKey || userKey.length == 0) {
      // TODO: Log an error!
      return;
    }

    var newMessageRef = firebaseAdmin.database().ref().child(`messages/${userKey}/`).push();
    newMessageRef.set({
      body: message.body,
      media: message.media,
      raw: message.data,
      created_at: (new Date()).toISOString()
    });

  });  
});

app.listen(3333, '0.0.0.0');