import { db } from 'src/firebase/firebase';
import { SubclassesModel } from './subclassesModels';
import { collectionList } from 'src/config/collectionList';

// Fonction pour générer le chemin dynamique
export const getSubclassesPath = (classRef: string) =>
  `${collectionList.CLASSES}/${classRef}/${collectionList.SUBCLASSES}`;

export class SubclassesService {
  // Méthode pour obtenir la référence dynamique
  getCollectionRef(classRef: string) {
    return db.collection(getSubclassesPath(classRef));
  }

  async getAllSubclasses(classRef: string) {
    const testRef = this.getCollectionRef(classRef); // Collection pour une classe spécifique
    const response = await testRef.get();
    const result = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return result;
  }

  async getSubclassByRef(classRef: string, ref: string) {
    const testRef = this.getCollectionRef(classRef);
    const response = await testRef.doc(ref).get();
    if (!response.exists) {
      throw new Error('Document not found');
    }
    return { id: response.id, ...response.data() };
  }

  async createSubclass(classRef: string, data: SubclassesModel) {
    const testRef = this.getCollectionRef(classRef);
    const docRef = testRef.doc(data.ref);
    const doc = await docRef.get();

    let setData = data;

    if (doc.exists) {
      const existingData = doc.data() as SubclassesModel;
      setData = { ...existingData, ...data };
    }
    await docRef.set(setData);

    return {
      id: data.name,
      message: 'Document created successfully with custom ID',
    };
  }

  async deleteSubclass(classRef: string, ref: string) {
    const testRef = this.getCollectionRef(classRef);
    const docRef = testRef.doc(ref);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('Document not found');
    }

    await docRef.delete();
    return { message: 'Document deleted successfully' };
  }
}

const classesService = new SubclassesService();
export default classesService;
