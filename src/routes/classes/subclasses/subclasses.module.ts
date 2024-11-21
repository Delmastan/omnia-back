import { Module } from '@nestjs/common';
import { SubclassesController } from './subclasses.controller';
import { SubclassesService } from './subclasses.service';

@Module({
  controllers: [SubclassesController],
  providers: [SubclassesService],
  exports: [SubclassesService],
})
export class SubclassesModule {}
