import { Controller, Get, Query } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('user')
  async getUser(@Query('uid') uid: string) {
    return this.firebaseService.getUser(uid);
  }
}
