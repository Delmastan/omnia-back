import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { collectionList } from 'src/config/collectionList';
import { SpellsService } from './spells.service';
import { SpellsModel } from './spellsModels';

@Controller(`${collectionList.CLASSES}/:classRef/${collectionList.SUBCLASSES}/:ref/${collectionList.SPELLS}`)
export class SpellsController {
    constructor(private readonly spellsService: SpellsService) {}

    /*
     * CRUD (Create and Update on same route)
     **/

    @Post()
    async createSpell(
        @Param('classRef') classRef: string,
        @Param('subclassRef') subclassRef: string,
        @Body() data: SpellsModel,
    ) {
        const result = await this.spellsService.createSpell(classRef, subclassRef, data);
        return result;
    }

    @Get()
    async getAllSpells(@Param('classRef') classRef: string, @Param('subclassRef') subclassRef: string) {
        const result = await this.spellsService.getAllSpells(classRef, subclassRef);
        return result;
    }

    @Get(':ref')
    async getSpellByRef(
        @Param('classRef') classRef: string,
        @Param('subclassRef') subclassRef: string,
        @Param('ref') ref: string,
    ) {
        const result = await this.spellsService.getSpellByRef(classRef, subclassRef, ref);
        return result;
    }

    @Delete(':ref')
    async deleteSpell(
        @Param('classRef') classRef: string,
        @Param('subclassRef') subclassRef: string,
        @Param('ref') ref: string,
    ) {
        const result = await this.spellsService.deleteSpell(classRef, subclassRef, ref);
        return result;
    }
}
