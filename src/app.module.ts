import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
