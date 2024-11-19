import { collectionList } from 'src/config/collectionList';
import { db } from 'src/firebase/firebase';
import { ClassesModel } from './classesModels';

export class ClassesService {
  testRef = db.collection(collectionList.CLASSES);

  async getAllClasses() {
    const response = await this.testRef.get();
    const result = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return result;
  }

  async getClassById(id: string) {
    const response = await this.testRef.doc(id).get();
    if (!response.exists) {
      throw new Error('Document not found');
    }
    return { id: response.id, ...response.data() };
  }

  async createClass(data: ClassesModel) {
    const response = await this.testRef.add(data);
    return { id: response.id, message: 'Document created successfully' };
  }

  async updateClass(id: string, data: ClassesModel) {
    const docRef = this.testRef.doc(id);
    const doc = await this.testRef.doc(id).get();
    if (!doc.exists) {
      throw new Error('Document not found');
    }

    await docRef.update(data);
    return { message: 'Document updated successfully' };
  }

  async deleteClass(id: string) {
    const docRef = this.testRef.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('Document not found');
    }

    await docRef.delete();
    return { message: 'Document deleted successfully' };
  }
}

const classesService = new ClassesService();
export default classesService;
