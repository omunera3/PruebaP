import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage implements OnInit {

  songs: any[];
  artist: string;

  constructor(private navParams: NavParams, private modalController: ModalController) { }
  ionViewDidEnter(){
    this.songs = this.navParams.data.songs;
    console.log(this.navParams);
    this.artist = this.navParams.data.artist;
  }
 /*Metodo para cerrar el modal y devolver el componente con la cancion que se seleccione*/
  async selectSong(song){
    await this.modalController.dismiss(song);
  }

  ngOnInit() {
  }

}
