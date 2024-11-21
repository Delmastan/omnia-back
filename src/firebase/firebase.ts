import * as admin from 'firebase-admin';

const serviceAccount = require('../config/firebase_key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();

export const FirebaseAdmin = admin;
