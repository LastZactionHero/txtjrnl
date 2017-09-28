// Parse a Twilio message
export default class TwilioMessageParser {
  constructor(data) {
    this.data = data;

    this.phoneNumber = this.data.From;
    
    this.body = this.data.Body;

    // Parse Media
    const mediaCount = parseInt(this.data.NumMedia);
    this.media = mediaCount > 0 ? [] : null;
    for(let i = 0; i < mediaCount; i++) {
      this.media.push({
        contentType: this.data['MediaContentType' + i],
        url: this.data["MediaUrl" + i]
      });
    }
  }
}