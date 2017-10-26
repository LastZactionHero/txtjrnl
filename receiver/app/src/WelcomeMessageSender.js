import Messages from './Messages';
import TwilioMessageSender from './TwilioMessageSender';
import Logger from './Logger';

export default class WelcomeMessageSender {
  constructor(phoneNumberFormatted, delay = 1000) {
    this._phoneNumberFormatted = phoneNumberFormatted;
    this._delay = delay;
  }

  send(finishedCallback) {
    this._finishedCallback = finishedCallback;

    Logger.instance().info(`Starting welcome message send to: ${this._phoneNumberFormatted}`);
    this._messageStack = Messages.welcome();
    this._sendNext();
  }

  _sendNext() {
    // Is everything done?
    if(this._messageStack.length == 0) { 
      Logger.instance().info('Welcome send complete.')
      if(this._finishedCallback) { this._finishedCallback() };
      return; 
    } 

    // Get the next message off the stack
    let messageBody = this._messageStack.splice(0,1);
    Logger.instance().info(`Sending message: ${messageBody}`);

    const sender = new TwilioMessageSender();    
    sender.send(this._phoneNumberFormatted, messageBody).then((messageSid) => {
      Logger.instance().info(`Send successful. SID: ${messageSid}`);
      setTimeout(this._sendNext.bind(this), this._delay);
    }).catch((error) => {
      Logger.instance().info("ERROR! Failed sending welcome message:")
      Logger.instance().info(error);
    })
  }
}