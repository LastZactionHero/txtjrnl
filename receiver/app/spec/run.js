import Jasmine from 'jasmine';
import FirebaseServer from 'firebase-server';

process.env.FIREBASE_DATABASE_URL = 'ws://localhost.firebaseio.test:5000' 
new FirebaseServer(5000, 'localhost.firebaseio.test', {
  demo: { a: 1 }
});

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();

