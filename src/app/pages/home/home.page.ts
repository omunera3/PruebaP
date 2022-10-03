import { SongsModalPage } from './../songs-modal/songs-modal.page';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { MusicService } from '../services-music/music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  songsart: any[] = [];
  song: any = {};
  currentSong: any = {};
  newTime;

  slideOps = {
    loop: false,
    slidesPerView: 4,
    slidesPerGroup: 4,
    grabCursor: true,
    spaceBetween: 30,
    speed: 400,
  };
  constructor(private musicService: MusicService, private modalController: ModalController) { }

  // renderiza cambios en la entrada directamente en la vista
  ionViewDidEnter(){
    this.fetchNewReleases();
  }

  fetchNewReleases() {
    this.musicService.getNewReleases().subscribe(release => {
      this.artists = this.musicService.getArtists().items;
      this.songs = release.albums.items.filter(e => e.album_type ==='single');
      this.albums = release.albums.items.filter(e => e.album_type ==='album');
    });
   }

   async showSongs(artist){
    let songsart;
    this.musicService.getArtistTopTracks(artist.id).subscribe(async release => {
      songsart = release.tracks;
      console.log(release.tracks);
      const modal = await this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          songs: songsart,
          artist: artist.name
        }
      });

      /* Obtener dato de cancion */
      modal.onDidDismiss().then(dataReturned=>{
        this.song = dataReturned.data;
      });

      return await modal.present();
    });

   }

   /*Api nativa del navegador para generear el audio */
   play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play(); //se le da play a la cancion
    //Interacción con la barra de la canción
    this.currentSong.addEventListener('timeupdate',()=>{
      this.newTime = (this.currentSong.currentTime / this.currentSong.duration);
    });
    this.song.playing = true;
   }

   pause(){
    this.currentSong.pause();
    this.song.playing = false;
   }

   //metodo para que el tiempo no tenga decimales
}
