const express = require('express')
const bodyParser = require('body-parser');;
const admin = require("firebase-admin");

// Firebase Admin Setup
var serviceAccount = require("/root/firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://txtjrnl.firebaseio.com"
});

// Init Express App
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

// SMS Reciever
app.post('/sms', function (req, res) {
  res.status(204).send();

  console.log(req.body)

  const phoneNumber = req.body.From;
  console.log(`From Phone Number: ${phoneNumber}`);

  var ref = admin.database().ref("preferences");
  ref.orderByChild('phoneNumberFormatted').equalTo(phoneNumber).limitToFirst(1).on("child_added", function(snapshot) {
    const userKey = snapshot.key;
    console.log(`Posting for User with key: ${userKey}`)
  });  
});

app.listen(3333, '0.0.0.0')



// { ToCountry: 'US',
//   MediaContentType0: 'image/jpeg',
//   ToState: 'CA',
//   SmsMessageSid: 'MM8bf262ec2c8fd8627833b05248a6d77e',
//   NumMedia: '1',
//   ToCity: '',
//   FromZip: '46240',
//   SmsSid: 'MM8bf262ec2c8fd8627833b05248a6d77e',
//   FromState: 'IN',
//   SmsStatus: 'received',
//   FromCity: 'INDIANAPOLIS',
//   Body: '',
//   FromCountry: 'US',
//   To: '+14159415765',
//   ToZip: '',
//   NumSegments: '1',
//   MessageSid: 'MM8bf262ec2c8fd8627833b05248a6d77e',
//   AccountSid: 'AC2c000352390f4af3fa68f7990e44bd7b',
//   From: '+13174968472',
//   MediaUrl0: 'https://api.twilio.com/2010-04-01/Accounts/AC2c000352390f4af3fa68f7990e44bd7b/Messages/MM8bf262ec2c8fd8627833b05248a6d77e/Media/MEc53fb5c3056f1c668900ddeac6d15ad8',
//   ApiVersion: '2010-04-01' }

//   { ToCountry: 'US',
//   ToState: 'CA',
//   SmsMessageSid: 'SM77e3cca1d7b8b6cf2116a7af0f69f176',
//   NumMedia: '0',
//   ToCity: '',
//   FromZip: '46240',
//   SmsSid: 'SM77e3cca1d7b8b6cf2116a7af0f69f176',
//   FromState: 'IN',
//   SmsStatus: 'received',
//   FromCity: 'INDIANAPOLIS',
//   Body: 'Hello+world!',
//   FromCountry: 'US',
//   To: '+14159415765',
//   ToZip: '',
//   NumSegments: '1',
//   MessageSid: 'SM77e3cca1d7b8b6cf2116a7af0f69f176',
//   AccountSid: 'AC2c000352390f4af3fa68f7990e44bd7b',
//   From: '+13174968472',
//   ApiVersion: '2010-04-01' }