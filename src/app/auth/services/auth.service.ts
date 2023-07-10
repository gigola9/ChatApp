import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTxYPJF0SrEXOOGg_5lO4IziSBz5bjzTo`;
  authInfo: AuthInfo = {};
  loggedIn = false;
  tkn!: string;
  loginError = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) { }

  async signUp({ email, password }) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const uid = credentials.user.uid;
  }

  signIn(nick: string, pass: string) {
    //this.http.put(`https://ertoba2013web-default-rtdb.firebaseio.com/test/test.json?auth=${this.authInfo.idToken}`, {name: 'Giorgi'}).subscribe();
    // this.afAuth.signInWithEmailAndPassword(nick, pass);
    const bd = {
      email: nick,
      password: pass,
      returnSecureToken: true
    }
    this.http.post(this.url, bd).subscribe(
      res => {
        this.authInfo = res;
        this.loggedIn = true;
        this.tkn = this.authInfo.idToken;
        localStorage.setItem('token', this.tkn);
        this.router.navigateByUrl('/main');
      },
      err => {
        this.loginError.next(true);
        console.log(err);
      }
    );
  }

  getToken() {
    return this.tkn;
  }

  setToken(tk: string) {
    this.tkn = tk;
  }

  setLoggedIn(st: boolean) {
    this.loggedIn = st;
  }

  getErrorState(): Observable<boolean> {
    return this.loginError.asObservable();
  }
}

export interface AuthInfo {
  displayName?: string;
  email?: string;
  expiresIn?: string | number;
  idToken?: string;
  kind?: string;
  localId?: string;
  refreshToken?: string;
  registered?: boolean;
}
