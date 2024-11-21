import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ClassesModule } from './routes/classes/classes.module';

@Module({
  imports: [FirebaseModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
