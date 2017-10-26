import Winston from 'winston';

export default {
  _instance: null,
  instance() {
    if(!this._instance) {
      this._instance = new (Winston.Logger)({
        transports: [
          new (Winston.transports.File)({ filename: process.env.RECEIVER_LOG_FILE })
        ]
      });
    }
    return this._instance;
  }
}