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

    async getClassByRef(ref: string) {
        const response = await this.testRef.doc(ref).get();
        if (!response.exists) {
            throw new Error('Document not found');
        }
        return { id: response.id, ...response.data() };
    }

    async createClass(data: ClassesModel) {
        const docRef = this.testRef.doc(data.ref);
        const doc = await docRef.get();

        let setData = data;

        if (doc.exists) {
            const existingData = doc.data() as ClassesModel;
            setData = { ...existingData, ...data };
        }
        await docRef.set(setData);

        return {
            id: data.name,
            message: 'Document created successfully with custom ID',
        };
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
