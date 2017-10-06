import WelcomeMessageSender from '../src/WelcomeMessageSender';
import TwilioMessageSender from '../src/TwilioMessageSender';
import Nock from 'nock';

describe('WelcomeMessageSenderSpec', () => {
  beforeEach( () => {
    Nock.disableNetConnect();
  });

  describe('send', () => {
    it('sends a series of welcome messages', (done) => {
      // Stub sending actual Twilio messages
      const stubbedSend = TwilioMessageSender.prototype.send;

      TwilioMessageSender.prototype.send = () => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve)
        });
      };

      const phoneNumber = '+13175551234';
      const sender = new WelcomeMessageSender(phoneNumber, 1);
      sender.send(() => {
        done();
        TwilioMessageSender.prototype.send = stubbedSend; // Replace stubbed method
      });
    });
  })
});