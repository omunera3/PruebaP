import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOptds = {
    initialSlide: 0,
    slidesPerView: 1,
    centerdSlides: true,
    speed: 400
  };

  /*definición de slide*/
  slides = [{
    imageSrc:'assets/img/logoo.jpeg',
    title:'Escucha tu música',
    subTitle:'EN CUALQUIER LUGAR',
    description: `Los mejores álbunes, las mejores canciones. Escucha en cualquier momento, a toda horas`,
    icon:'play',
  },{
    imageSrc:'assets/img/logoo.jpeg',
    title:'Disfruta de nuestro reproductor',
    subTitle:'DE VIDEO INCREIBLES',
    description: `entra al modo video de nuestro reproductor y obtén acceso a clips
                   documentales y makin offs increibles de tus artistas favoritos`,
    icon:'videocam',
  },{
    imageSrc:'assets/img/logoo.jpeg',
    title:'Accede al exclusivo',
    subTitle:'MODO DEPORTE',
    description: `Crea una playlist basada en tu actividada física. Ten reportes y acceso a lo que necesitas, integrado con GPS!`,
    icon:'bicycle',
  }];
  constructor(private router: Router, private storage: Storage) { }

  /*
  storage para poder guardar claves y valores en el storage del dispositivo
  Función para cerrar los slides y me dirija al login*/
  finish(){
    this.storage.create();
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
