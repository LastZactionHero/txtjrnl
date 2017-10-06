import Messages from './Messages';
import TwilioMessageSender from './TwilioMessageSender';

export default class DormantMessageSender {
  constructor(phoneNumberFormatted, delay = 1000) {
    this._phoneNumberFormatted = phoneNumberFormatted;
    this._delay = delay;
  }

  send(finishedCallback) {
    this._finishedCallback = finishedCallback;

    console.log(`Starting dormant message send to: ${this._phoneNumberFormatted}`);
    this._messageStack = Messages.dormant();
    this._sendNext();
  }

  _sendNext() {
    // Is everything done?
    if(this._messageStack.length == 0) { 
      console.log('Dormant send complete.')
      this._finishedCallback();
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
      console.log("ERROR! Failed sending dormant message:")
      console.log(error);
    })
  }
}