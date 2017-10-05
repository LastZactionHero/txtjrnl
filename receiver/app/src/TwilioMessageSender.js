import Twilio from 'twilio';

export default class TwilioMessageSender {
  constructor() {}

  send(toPhoneNumber, messageBody) {
    const authToken = process.env.TWILIO_ACCOUNT_SECRET;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const outboundPhone = process.env.TWILIO_OUTBOUND_PHONE;

    return new Promise((resolve, reject) => {
      var client = new Twilio(accountSid, authToken);
      client.messages.create({
        body: messageBody,
        to: toPhoneNumber,  
        from: outboundPhone
      }).then((message) => { 
        resolve(message.sid) 
      }).catch((error) => {
        // TODO: Test this with real data
        reject(error)
      })
  
    });
  }
}