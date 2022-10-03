import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });

    /*Se inicializa la valriable errorMessage */
    this.errorMessage = '';
  }

  async ngOnInit() {
    /* Se crear el storage */
    await this.storage.create();
  }

  /*Metodo para hacer login*/
  loginUser(credentials) {
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = '';
      this.storage.set('isUserloggedIn', true);
      this.navCtrl.navigateForward('/menu/home');
      console.log(res);
    }).catch(err => {
      this.errorMessage = err;
    });
  }

  /* Metodo para ir al modulo del registro desde el modulo de login */
  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }
}
