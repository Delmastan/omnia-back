import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { collectionList } from 'src/config/collectionList';
import { ClassesModel } from './classesModels';
import { ClassesService } from './classes.service';

@Controller(collectionList.CLASSES)
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    /*
     * CRUD (Create and Update on same route)
     **/

    @Post()
    async createClass(@Body() data: ClassesModel) {
        const result = await this.classesService.createClass(data);
        return result;
    }

    @Get()
    async getAllClasses() {
        const result = await this.classesService.getAllClasses();
        return result;
    }

    @Get(':ref')
    async getClassByRef(@Param('ref') ref: string) {
        const result = await this.classesService.getClassByRef(ref);
        return result;
    }

    @Delete(':ref')
    async deleteClass(@Param('ref') ref: string) {
        const result = await this.classesService.deleteClass(ref);
        return result;
    }
}
