import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesService } from './routes/classes/classes.service';
import { ClassesController } from './routes/classes/classes.controller';

@Module({
  imports: [],
  controllers: [AppController, ClassesController],
  providers: [AppService, ClassesService],
})
export class AppModule {}
