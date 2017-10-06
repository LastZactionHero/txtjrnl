import DatabaseService from '../src/DatabaseService';

describe('DatabaseService', () => {
  describe('getDatabase', () => {
    it('returns an instance of the Firebase database and connects', (done) => {
      const database = DatabaseService.getDatabase();
      var connectedRef = database.ref(".info/connected");
      connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
          done();
        }
      });
    });

    it('adds something', (done) => {
      const database = DatabaseService.getDatabase();

      const demoModel = '/demo_model'
      const newValue = { demo_value: 1234 }
      const newKey = 'abcd123';

      const getRef = database.ref(demoModel)
      getRef.on('child_added', (snapshot) => {
        expect(snapshot.key).toEqual(newKey);
        expect(snapshot.val()).toEqual(newValue);
        done();
      });

      const ref = database.ref(`${demoModel}/${newKey}`)
      ref.set(newValue);
    });
  })
});