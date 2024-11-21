import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SubclassesService } from './subclasses.service';
import { SubclassesModel } from './subclassesModels';
import { collectionList } from 'src/config/collectionList';

@Controller(`${collectionList.CLASSES}/:classRef/${collectionList.SUBCLASSES}`)
export class SubclassesController {
  constructor(private readonly subclassesService: SubclassesService) {}

  // CREATE: Ajouter un document dans la collection
  @Post()
  async createClass(
    @Param('classRef') classRef: string,
    @Body() data: SubclassesModel,
  ) {
    const result = await this.subclassesService.createSubclass(classRef, data);
    return result;
  }

  // READ: Récupérer tous les documents de la collection
  @Get()
  async getAllClasses(@Param('classRef') classRef: string) {
    const result = await this.subclassesService.getAllSubclasses(classRef);
    return result;
  }

  // READ: Récupérer un document spécifique par ID
  @Get(':ref')
  async getDocumentByRef(
    @Param('classRef') classRef: string,
    @Param('ref') ref: string,
  ) {
    const result = await this.subclassesService.getSubclassByRef(classRef, ref);
    return result;
  }

  // DELETE: Supprimer un document par ID
  @Delete(':ref')
  async deleteDocument(
    @Param('classRef') classRef: string,
    @Param('ref') ref: string,
  ) {
    const result = await this.subclassesService.deleteSubclass(classRef, ref);
    return result;
  }
}
