import Twilio from 'twilio';

export default class TwilioMessageSender {
  send(toPhoneNumber, messageBody) {
    const authToken = process.env.TWILIO_ACCOUNT_SECRET;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const outboundPhone = process.env.TWILIO_OUTBOUND_PHONE;

    if(!toPhoneNumber || toPhoneNumber.length == 0) { throw 'Phone number must be present!' }
    if(!messageBody || messageBody.length == 0) { throw 'Message must be present!' }

    return new Promise((resolve, reject) => {
      var client = new Twilio(accountSid, authToken);
      client.messages.create({
        body: messageBody,
        to: toPhoneNumber,  
        from: outboundPhone
      }).then((message) => { 
        resolve(message.sid)
      }).catch((error) => {
        resolve(error); // TODO: Test this!
      });
    });
  }
}