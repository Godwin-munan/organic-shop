import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { Observable, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebase.default.User | null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login(){

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
    
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{

  return this.user$.pipe(
      switchMap(user => { let userId = user?.uid!
       return  this.userService.get(userId);
      })
    )
    
  }
}
