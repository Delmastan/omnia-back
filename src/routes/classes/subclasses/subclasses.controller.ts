import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SubclassesService } from './subclasses.service';
import { SubclassesModel } from './subclassesModels';
import { collectionList } from 'src/config/collectionList';

@Controller(`${collectionList.CLASSES}/:classRef/${collectionList.SUBCLASSES}`)
export class SubclassesController {
    constructor(private readonly subclassesService: SubclassesService) {}

    /*
     * CRUD (Create and Update on same route)
     **/

    @Post()
    async createSubclass(@Param('classRef') classRef: string, @Body() data: SubclassesModel) {
        const result = await this.subclassesService.createSubclass(classRef, data);
        return result;
    }

    @Get()
    async getAllSubclasses(@Param('classRef') classRef: string) {
        const result = await this.subclassesService.getAllSubclasses(classRef);
        return result;
    }

    @Get(':ref')
    async getSubclassByRef(@Param('classRef') classRef: string, @Param('ref') ref: string) {
        const result = await this.subclassesService.getSubclassByRef(classRef, ref);
        return result;
    }

    @Delete(':ref')
    async deleteSubclass(@Param('classRef') classRef: string, @Param('ref') ref: string) {
        const result = await this.subclassesService.deleteSubclass(classRef, ref);
        return result;
    }
}
