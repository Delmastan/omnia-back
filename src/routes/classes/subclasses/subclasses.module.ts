import { Module } from '@nestjs/common';
import { SubclassesController } from './subclasses.controller';
import { SubclassesService } from './subclasses.service';
import { SpellsModule } from './spells/spells.module';

@Module({
    imports: [SpellsModule],
    controllers: [SubclassesController],
    providers: [SubclassesService],
    exports: [SubclassesService],
})
export class SubclassesModule {}
