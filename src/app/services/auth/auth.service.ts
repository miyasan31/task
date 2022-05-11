import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { firebaseError } from './firebase.error';

type RedirectPath = '/signin' | '/signin/register' | '/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: Auth,
    public navController: NavController,
    public alertController: AlertController,
  ) {}

  async getUserId(): Promise<string> {
    const user = await this.afAuth.currentUser;
    return user.uid;
  }

  googleSignIn() {
    return signInWithPopup(this.afAuth, new GoogleAuthProvider()).then(() => {
      this.navController.navigateForward('/task').catch((error) => {
        console.log(error.message);
        this.alertError(error);
        throw error;
      });
    });
  }

  emailSignUp(data: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.afAuth, data.email, data.password).then(() => {
      this.navigatePath('/task');
    });
  }

  emailSignIn(data: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.afAuth, data.email, data.password).then(() => {
      this.navigatePath('/task');
    });
  }

  signOut() {
    return signOut(this.afAuth).then(() => {
      this.navigatePath('/signin');
    });
  }

  navigatePath(path: RedirectPath) {
    this.navController.navigateForward(path).catch((error) => {
      console.log(error.message);
      this.alertError(error);
      throw error;
    });
  }

  async alertError(e) {
    if (firebaseError.hasOwnProperty(e.code)) {
      e = firebaseError[e.code];
    }

    const alert = await this.alertController.create({
      header: e.code,
      message: e.message,
      buttons: ['閉じる'],
    });
    await alert.present();
  }
}
