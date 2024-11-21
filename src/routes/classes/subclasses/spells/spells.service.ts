import { db } from 'src/firebase/firebase';
import { SpellsModel } from './spellsModels';
import { collectionList } from 'src/config/collectionList';
import { getSubclassesPath } from '../subclasses.service';

export const getSpellsPath = (classRef: string, subclassRef: string) =>
    `${getSubclassesPath(classRef)}/${subclassRef}/${collectionList.SPELLS}`;

export class SpellsService {
    getCollectionRef(classRef: string, subclassRef: string) {
        return db.collection(getSpellsPath(classRef, subclassRef));
    }

    async getAllSpells(classRef: string, subclassRef: string) {
        const testRef = this.getCollectionRef(classRef, subclassRef);
        const response = await testRef.get();
        const result = response.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return result;
    }

    async getSpellByRef(classRef: string, subclassRef: string, ref: string) {
        const testRef = this.getCollectionRef(classRef, subclassRef);
        const response = await testRef.doc(ref).get();
        if (!response.exists) {
            throw new Error('Document not found');
        }
        return { id: response.id, ...response.data() };
    }

    async createSpell(classRef: string, subclassRef: string, data: SpellsModel) {
        const testRef = this.getCollectionRef(classRef, subclassRef);
        const docRef = testRef.doc(data.ref);
        const doc = await docRef.get();

        let setData = data;

        if (doc.exists) {
            const existingData = doc.data() as SpellsModel;
            setData = { ...existingData, ...data };
        }
        await docRef.set(setData);

        return {
            id: data.name,
            message: 'Document created successfully with custom ID',
        };
    }

    async deleteSpell(classRef: string, subclassRef: string, ref: string) {
        const testRef = this.getCollectionRef(classRef, subclassRef);
        const docRef = testRef.doc(ref);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error('Document not found');
        }

        await docRef.delete();
        return { message: 'Document deleted successfully' };
    }
}

const spellsService = new SpellsService();
export default spellsService;
