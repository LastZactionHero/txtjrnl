export default {
  database: firebase.database(),
  getDatabase() {
    if(!this._database) {
      this._database = firebase.database(); 
    }
    return this._database;
  }
}