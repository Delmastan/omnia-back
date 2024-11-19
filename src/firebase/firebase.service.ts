import { Bucket, Storage } from '@google-cloud/storage';
import * as firebase from 'firebase-admin';
import { setFirebaseAuth, setFirestore } from './firestore.service';

export const getAppEngineServiceAccountId = (): string => {
  return `${process.env.PROJECT_ID}@appspot.gserviceaccount.com`;
};

export const getComputeEngineServiceAccountId = (): string => {
  return `${process.env.GCP_PROJECT_NUMBER}-compute@developer.gserviceaccount.com`;
};

export const getFirebaseProjectId = (): string => {
  return process.env.PROJECT_ID!;
};

export const getBucketName = () => {
  return `${process.env.PROJECT_ID}.appspot.com`;
};

let storageBucket: Bucket;

const setStorageBucket = (bucket: Bucket) => {
  storageBucket = bucket;
};

export const getStorageBucket = () => {
  return storageBucket;
};

const initFirebaseApp = (): firebase.app.App => {
  console.info(
    `Initializing firebase app for project ${process.env.PROJECT_ID}`,
  );
  const appOptions: firebase.AppOptions = {
    credential: firebase.credential.applicationDefault(),
    projectId: process.env.PROJECT_ID,
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
    storageBucket: getBucketName(),
  };

  const firebaseApp = firebase.initializeApp(appOptions);
  const firestore = firebaseApp.firestore();
  firestore.settings({ ignoreUndefinedProperties: true });

  const storage = new Storage();
  const bucket = storage.bucket(getBucketName());
  setStorageBucket(bucket);

  setFirestore(firestore as any);
  setFirebaseAuth(firebaseApp.auth() as any);
  return firebaseApp;
};

export const getFirebaseApp = () => {
  return !firebase.apps.length ? initFirebaseApp() : firebase.app();
};
