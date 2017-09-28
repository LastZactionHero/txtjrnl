const express = require('express')
const bodyParser = require('body-parser');;
const admin = require("firebase-admin");

import TwilioMessageParser from './TwilioMessageParser';

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


  const message = new TwilioMessageParser(req.body);
  console.log(message.phoneNumber);
  console.log(message.body);
  console.log(message.media);

  var ref = admin.database().ref("preferences");
  ref.orderByChild('phoneNumberFormatted').equalTo(message.phoneNumber).limitToFirst(1).on("child_added", function(snapshot) {
    const userKey = snapshot.key;
    console.log(`Posting for User with key: ${userKey}`);

    if(!userKey || userKey.length == 0) {
      // TODO: Log an error!
      return;
    }

    var newMessageRef = admin.database().ref().child('messages').push();
    newMessageRef.set({
      uid: userKey,
      body: message.body,
      media: message.media,
      raw: message.data
    });

  });  
});

app.listen(3333, '0.0.0.0')