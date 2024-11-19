import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { collectionList } from './config/collectionList';
import { FirestoreDataService } from './firebase/firestoreDataService';

@Controller(collectionList.TEST)
export class AppController {
  constructor(private readonly firebaseDataService: FirestoreDataService) {}

  // CREATE: Ajouter un document dans la collection
  @Post()
  async createDocument(@Body() data: any) {
    try {
      const docPath = `${collectionList.TEST}/${data.id}`;
      await this.firebaseDataService.postDocToFirestore(docPath, data);

      return { message: 'Document created successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to create document',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // READ: Récupérer tous les documents de la collection
  @Get()
  async getAllDocuments() {
    try {
      const tests = await this.firebaseDataService.getCollectionGroup(
        collectionList.TEST,
      );
      const result = tests.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch documents',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // READ: Récupérer un document spécifique par ID
  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    try {
      const docPath = `${collectionList.TEST}/${id}`;
      const response =
        await this.firebaseDataService.getDocFromFirestore(docPath);

      if (!response?.exists) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      return { id: response.id, ...response.data() };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch document',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // UPDATE: Mettre à jour un document par ID
  @Put(':id')
  async updateDocument(@Param('id') id: string, @Body() data: any) {
    try {
      const docPath = `${collectionList.TEST}/${id}`;
      const doc = await this.firebaseDataService.getDocFromFirestore(docPath);

      if (!doc?.exists) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      await this.firebaseDataService.updateDocToFirestore(docPath, data);
      return { message: 'Document updated successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to update document',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // DELETE: Supprimer un document par ID
  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    try {
      const docPath = `${collectionList.TEST}/${id}`;
      const doc = await this.firebaseDataService.getDocFromFirestore(docPath);

      if (!doc?.exists) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      await this.firebaseDataService.deleteDocToFirestore(docPath);
      return { message: 'Document deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete document',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
