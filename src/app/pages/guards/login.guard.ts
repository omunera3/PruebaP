import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router){
    this.storage.create();
  }
  async canActivate() {
    const isUserloggedIn = await this.storage.get('isUserloggedIn');
    if(isUserloggedIn){
      return true;
    }else{
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}
