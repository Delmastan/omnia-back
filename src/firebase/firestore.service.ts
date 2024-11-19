import * as FirebaseAuth from '@firebase/auth-types';
import { FirebaseFirestore, Timestamp } from '@firebase/firestore-types';
import { FirebaseAuthenticationErrorCodes } from '../config/FirebaseAuthenticationErrorCodes';
import { getCurrentUserResponse } from '../config/GetCurrentUser';

let firestore: FirebaseFirestore;
let auth: FirebaseAuth.FirebaseAuth;
let messaging: any;

export const ROOT_DB_URL = 'businesses';
export const setMessaging = (messagingInstance: any) => {
  messaging = messagingInstance;
};

export const getMessaging = () => {
  return messaging;
};
export function extractDateFromTimestampOrString(
  date?: Date | null,
): Date | null {
  if (!date) {
    return null;
  }
  const timeStamp = date as unknown as Timestamp;
  const dateJS = new Date(date);

  if (timeStamp && typeof timeStamp.toDate === 'function') {
    return timeStamp.toDate();
  } else if (dateJS.toString() !== 'Invalid Date') {
    return dateJS;
  } else {
    return null;
  }
}

/**
 * Takes an object and transform all geometries into string.
 * Useful because geojson geometries are not supported by firestore.
 * WARNING: the object given to the function itself is modified, there
 * is no copy made in the function!
 * WARNING: if the parameter is just an undefined, it won't be deleted!
 * @param object
 * @returns
 */
export const transformGeometryInString = <Type>(object: Type): Type => {
  const transformGeometryInStringRecursive = (thisObj: any) => {
    if (thisObj) {
      // Iterate trough the object if it's an object
      if (typeof thisObj === 'object') {
        Object.keys(thisObj).forEach((key) => {
          if (
            key === 'geometry' &&
            typeof thisObj[key] === 'object' &&
            (thisObj[key].type === 'Polygon' ||
              thisObj[key].type === 'MultiPolygon' ||
              thisObj[key].type === 'Point' ||
              thisObj[key].type === 'MultiPoint' ||
              thisObj[key].type === 'LineString' ||
              thisObj[key].type === 'MultiLineString' ||
              thisObj[key].type === 'GeometryCollection')
          ) {
            thisObj[key] = JSON.stringify(thisObj[key]);
          } else {
            transformGeometryInStringRecursive(thisObj[key]);
          }
        });
      }
    }
  };

  // Let's make it any so that we can manipulate the keys easily
  const obj: any = object as any;

  // Only do the action if it's an object or a string.
  // If it's another property, do nothing
  if (typeof obj === 'object' || Array.isArray(obj)) {
    transformGeometryInStringRecursive(obj);
  }
  // else: do nothing if it's not an object*/
  return obj;
};

export const setFirestore = (firestoreInstance: FirebaseFirestore) => {
  firestore = firestoreInstance;
};

export const getFirestore = (): FirebaseFirestore => {
  return firestore;
};

export const setFirebaseAuth = (
  firebaseAuthInstance: FirebaseAuth.FirebaseAuth,
) => {
  auth = firebaseAuthInstance;
};

export const getAuth = (): FirebaseAuth.FirebaseAuth => {
  return auth;
};

export const getFirebaseAuthErrorId = (
  firebaseErrorCode: FirebaseAuthenticationErrorCodes,
): string | null => {
  switch (firebaseErrorCode) {
    case FirebaseAuthenticationErrorCodes.EMAIL_ALREADY_IN_USE:
      return 'firebase.auth.error.email_already_in_use';
    case FirebaseAuthenticationErrorCodes.INVALID_EMAIL:
      return 'firebase.auth.error.invalid_email_or_password';
    case FirebaseAuthenticationErrorCodes.OPERATION_NOT_ALLOWED:
      return 'firebase.auth.error.operation_not_allowed';
    case FirebaseAuthenticationErrorCodes.USER_DISABLE:
      return 'firebase.auth.error.user_disable';
    case FirebaseAuthenticationErrorCodes.USER_NOT_FOUND:
      return 'firebase.auth.error.user_not_found';
    case FirebaseAuthenticationErrorCodes.WEAK_PASSWORD:
      return 'firebase.auth.error.weak_password';
    case FirebaseAuthenticationErrorCodes.WRONG_PASSWORD:
      return 'firebase.auth.error.invalid_email_or_password';
    default:
      return null;
  }
};
class FirestoreAuthService {
  async logIn(
    email: string,
    password: string,
  ): Promise<FirebaseAuth.UserCredential> {
    const userCredentials = await getAuth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredentials;
  }
  /*async createUser(email: string, password: string): Promise<FirebaseAuth.UserCredential> {
        const userCredentials = await getAuth().createUserWithEmailAndPassword(email, password);
        return userCredentials;
    }*/
  /*async updateUser(user: FirebaseAuth.User, data: any): Promise<void> {
        await user.updateProfile(data);
    }*/
  async sendRecoverPasswordEmail(email: string): Promise<void> {
    await getAuth().sendPasswordResetEmail(email);
  }
  async logOut(): Promise<void> {
    await getAuth().signOut();
  }

  async getIdToken(): Promise<FirebaseAuth.IdTokenResult | null> {
    const user = auth.currentUser;
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      return tokenResult;
    }
    return null;
  }

  getCurrentUser(): Promise<getCurrentUserResponse | null> {
    return new Promise<getCurrentUserResponse | null>((resolve, reject) => {
      const unsubscribe = getAuth().onAuthStateChanged(
        async (userAuth: FirebaseAuth.User | null) => {
          if (userAuth) {
            unsubscribe();
            try {
              const tokenResult = await userAuth.getIdTokenResult();
              resolve({
                token: tokenResult,
                uid: userAuth.uid,
              });
            } catch (error) {}
          }
          resolve(null);
        },
        reject,
      );
    });
  }

  getAuth(): FirebaseAuth.FirebaseAuth {
    return auth;
  }
}

export const firestoreAuthService = new FirestoreAuthService();
