import { WhereFilterOp } from '@firebase/firestore-types';
import { getFirebaseApp } from './firebase.service';

export interface WhereQuery {
  key: string;
  whereOp: WhereFilterOp;
  value:
    | string
    | number
    | boolean
    | null
    | Date
    | string[]
    | number[]
    | boolean[]
    | Date[];
}

const db: FirebaseFirestore.Firestore = getFirebaseApp().firestore();

export class FirestoreDataService {
  ROOT_DB_URL = 'businesses';
  USERS_COLLECTION = 'users';
  USERACCESSES_COLLECTION = 'useraccesses';
  PRODUCERS_COLLECTION = 'producers';
  FIELDS_COLLECTION = 'fields';
  NOTES_COLLECTION = 'notes';
  DISTRIBUTORS_COLLECTION = 'distributors';
  ORGANIZATIONS_COLLECTION = 'organizations';
  PROCESSINGS_COLLECTION = 'processings';
  SUBSCRIPTIONS_CONTRACTS_COLLECTION = 'contracts';
  PRODUCTIONS_COLLECTION = 'productions';

  static MAX_BATCH_WRITES = 500;

  createBatch(): FirebaseFirestore.WriteBatch {
    return db.batch();
  }

  async getCollectionGroup(
    key: string,
    whereQueries?: WhereQuery[],
  ): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
    let req:
      | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>
      | FirebaseFirestore.CollectionGroup<FirebaseFirestore.DocumentData> =
      db.collectionGroup(key);

    if (whereQueries && whereQueries.length) {
      whereQueries.forEach((query) => {
        req = req.where(query.key, query.whereOp, query.value);
      });
    }
    return await req.get();
  }

  async postDocToFirestore(
    path: string,
    data: any,
    options?: FirebaseFirestore.SetOptions,
    batch?: FirebaseFirestore.WriteBatch,
  ): Promise<void> {
    if (batch) {
      batch.set(db.doc(path), data, options ?? {});
    } else {
      await db.doc(path).set(data, options ?? {});
    }
  }

  async getColFromFirestore(
    path: string,
    whereQueries?: WhereQuery[],
    selectQuery?: string[],
    limit?: number,
    orderBy?: string,
    orderDirection?: 'asc' | 'desc',
  ): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
    return this.getDataFromFirestore(
      path,
      false,
      whereQueries,
      selectQuery,
      limit,
      orderBy,
      orderDirection,
    );
  }

  async getDataFromFirestore(
    pathOrCollectionGroup: string,
    isGroup: boolean,
    whereQueries?: WhereQuery[],
    selectQuery?: string[],
    // Due to the non transformation of validation pipe limit pass as query can be a string.
    limit?: number | string,
    orderBy?: string,
    orderDirection?: 'asc' | 'desc',
  ): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
    let req: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = isGroup
      ? db.collectionGroup(pathOrCollectionGroup)
      : db.collection(pathOrCollectionGroup);

    if (limit) {
      let limitDocuments = limit;
      if (typeof limit !== 'number') {
        limitDocuments = parseFloat(limit);
      }
      req = req.limit(limitDocuments as number);
    }

    if (whereQueries && whereQueries.length) {
      whereQueries.forEach((query) => {
        req = req.where(query.key, query.whereOp, query.value);
      });
    }
    if (selectQuery && selectQuery.length) {
      req = req.select(...selectQuery);
    }

    if (orderBy) {
      req = req.orderBy(orderBy, orderDirection ?? 'asc');
    }
    return req.get();
  }

  async getColDataFromFirestore<TDataType>(
    pathOrCollectionGroup: string,
    isCollectionGroup?: boolean,
    whereQueries?: WhereQuery[],
    selectQuery?: string[],
    limit?: number,
    orderBy?: string,
    orderDirection?: 'asc' | 'desc',
  ): Promise<TDataType[]> {
    const querySnapshots = await this.getDataFromFirestore(
      pathOrCollectionGroup,
      isCollectionGroup || false,
      whereQueries,
      selectQuery,
      limit,
      orderBy,
      orderDirection,
    );
    const data: TDataType[] = [];
    querySnapshots.forEach((doc) => {
      data.push(doc.data() as TDataType);
    });
    return data;
  }

  async updateDocToFirestore(path: string, data: any): Promise<void> {
    await db.doc(path).update({ ...data });
    return data;
  }

  async getDocFromFirestore(
    path: string,
  ): Promise<
    | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    | null
    | undefined
  > {
    const doc = await db.doc(path).get();

    return doc;
  }

  async deleteDocToFirestore(path: string): Promise<void> {
    await db.doc(path).delete();
  }
}

export const firestoreDataService = new FirestoreDataService();
