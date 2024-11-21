import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { db } from './firebase/firebase';

@Controller('test')
export class AppController {
    // CREATE: Ajouter un document dans la collection
    @Post()
    async createDocument(@Body() data: any) {
        try {
            const docRef = await db.collection('test').add(data);
            return { id: docRef.id, message: 'Document created successfully' };
        } catch (error) {
            throw new HttpException('Failed to create document', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ: Récupérer tous les documents de la collection
    @Get()
    async getAllDocuments() {
        try {
            const snapshot = await db.collection('test').get();
            const result = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return result;
        } catch (error) {
            throw new HttpException('Failed to fetch documents', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // READ: Récupérer un document spécifique par ID
    @Get(':id')
    async getDocumentById(@Param('id') id: string) {
        try {
            const docRef = db.collection('test').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
            }

            return { id: doc.id, ...doc.data() };
        } catch (error) {
            throw new HttpException('Failed to fetch document', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // UPDATE: Mettre à jour un document par ID
    @Put(':id')
    async updateDocument(@Param('id') id: string, @Body() data: any) {
        try {
            const docRef = db.collection('test').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
            }

            await docRef.update(data);
            return { message: 'Document updated successfully' };
        } catch (error) {
            throw new HttpException('Failed to update document', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE: Supprimer un document par ID
    @Delete(':id')
    async deleteDocument(@Param('id') id: string) {
        try {
            const docRef = db.collection('test').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
            }

            await docRef.delete();
            return { message: 'Document deleted successfully' };
        } catch (error) {
            throw new HttpException('Failed to delete document', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
