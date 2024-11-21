import { Injectable } from '@nestjs/common';
import { FirebaseAdmin } from './firebase';

@Injectable()
export class FirebaseService {
    async getUser(uid: string) {
        return FirebaseAdmin.auth().getUser(uid);
    }

    async verifyToken(token: string) {
        return FirebaseAdmin.auth().verifyIdToken(token);
    }
}
