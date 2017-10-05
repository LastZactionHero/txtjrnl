import Nock from 'nock';
import TwilioMessageSender from "../src/TwilioMessageSender";
import Twilio from 'twilio';

const nockBack = Nock.back;

describe('TwilioMessageSender', () => {
  describe('send', () => {
    beforeEach( () => {
      nockBack.fixtures = "./spec/support/fixtures/nock";
      nockBack.setMode('lockdown');
    })

    it('sends a message, returns Message SID on success', (done) => {
      const phoneNumber = '+13174968472';
      const messageBody = 'Hello, world!';

      nockBack('message_sender_success.json', function(nockDone) {
        const sender = new TwilioMessageSender();
        sender.send(phoneNumber, messageBody).then((messageSid) => {
          nockDone();
          expect(messageSid).toEqual('SM7a97a94668e84d389267745d39bb9556')
          done();
        });
      });
    });

    xit('returns error on failure', () => {});

    it('raises an execption if phone number is not provided', () => {
      const sender = new TwilioMessageSender();
      expect(() => { sender.send(null, 'x') }).toThrow();
      expect(() => { sender.send('', 'x') }).toThrow();
    });

    it('raises an exception of message is blank or null', () => {
      const sender = new TwilioMessageSender();
      expect(() => { sender.send('+13175551234', '') }).toThrow();
      expect(() => { sender.send('+13175551234', null) }).toThrow();
    });

  });
});