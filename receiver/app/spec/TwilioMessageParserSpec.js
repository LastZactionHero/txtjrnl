import Fixture from "./support/Fixture"
import TwilioMessageParser from "../src/TwilioMessageParser";

describe('TwilioMessageParser', () => {
  it('parses a message with media', () => {
    const receivedData = Fixture.import("media_message");
    const message = new TwilioMessageParser(receivedData);

    expect(message.phoneNumber).toEqual('+13174968472');
    expect(message.media).toEqual([
      {
        contentType: "image/jpeg",
        url: "https//api.twilio.com/2010-04-01/Accounts/FAKE/URL"
      }
    ]);
    expect(message.body).toEqual('')
  });

  it('parses a text message', () => {
    const receivedData = Fixture.import("text_message");
    const message = new TwilioMessageParser(receivedData);

    expect(message.phoneNumber).toEqual('+13174968472');
    expect(message.media).toBeNull();
    expect(message.body).toEqual('Hello world!')
  });
});