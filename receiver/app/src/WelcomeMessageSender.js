import Messages from './Messages';
import TwilioMessageSender from './TwilioMessageSender';

export default class WelcomeMessageSender {
  constructor(phoneNumberFormatted, delay = 1000) {
    this._phoneNumberFormatted = phoneNumberFormatted;
    this._delay = delay;
  }

  send() {
    console.log(`Starting welcome message send to: ${this._phoneNumberFormatted}`);
    this._messageStack = Messages.welcome();
    this._sendNext();
  }

  _sendNext() {
    // Is everything done?
    if(this._messageStack.length == 0) { 
      console.log('Welcome send complete.')
      return; 
    } 

    // Get the next message off the stack
    let messageBody = this._messageStack.splice(0,1);
    console.log(`Sending message: ${messageBody}`);

    const sender = new TwilioMessageSender();    
    sender.send(this._phoneNumberFormatted, messageBody).then((messageSid) => {
      console.log(`Send successful. SID: ${messageSid}`);
      setTimeout(this._sendNext.bind(this), this._delay);
    }).catch((error) => {
      console.log("ERROR! Failed sending welcome message:")
      console.log(error);
    })
  }
}