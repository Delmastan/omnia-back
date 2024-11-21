import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { collectionList } from 'src/config/collectionList';
import { ClassesModel } from './classesModels';
import { ClassesService } from './classes.service';

@Controller(collectionList.CLASSES)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  // CREATE: Ajouter un document dans la collection
  @Post()
  async createClass(@Body() data: ClassesModel) {
    const result = await this.classesService.createClass(data);
    return result;
  }

  // READ: Récupérer tous les documents de la collection
  @Get()
  async getAllClasses() {
    const result = await this.classesService.getAllClasses();
    return result;
  }

  // READ: Récupérer un document spécifique par ID
  @Get(':ref')
  async getDocumentByRef(@Param('ref') ref: string) {
    const result = await this.classesService.getClassByRef(ref);
    return result;
  }

  // UPDATE: Mettre à jour un document par ID
  //   @Put(':id')
  //   async updateDocument(@Param('id') id: string, @Body() data: any) {
  //     const result = await this.classesService.updateClass(id, data);
  //     return result;
  //   }

  // DELETE: Supprimer un document par ID
  @Delete(':ref')
  async deleteDocument(@Param('ref') ref: string) {
    const result = await this.classesService.deleteClass(ref);
    return result;
  }
}
