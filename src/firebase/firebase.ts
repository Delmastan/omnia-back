import * as admin from 'firebase-admin';

const serviceAccount = require('../config/omnia-api-8b243-firebase-adminsdk-35inn-ccdecb39f2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

export const FirebaseAdmin = admin;
