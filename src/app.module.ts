import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ClassesController } from './routes/classes/classes.controller';
import { ClassesService } from './routes/classes/classes.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController, ClassesController],
  providers: [AppService, ClassesService],
})
export class AppModule {}
