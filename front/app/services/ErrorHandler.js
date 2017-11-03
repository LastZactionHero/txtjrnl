import SessionService from './SessionService';

export default {
  handleError(error) {
    if(error.code == 'PERMISSION_DENIED') {
      const sessionService = new SessionService();
      sessionService.signOut();
    }
  }
}