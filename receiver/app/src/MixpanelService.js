import Mixpanel from 'mixpanel';

export default {
  _instance: null,
  getInstance() {
    if(!this._instance) {
      this._instance = Mixpanel.init("f940feaf4b11b6ffcfb8eb7bf9fd76df", { protocol: 'https' });            
    }
    return this._instance;
  }
}