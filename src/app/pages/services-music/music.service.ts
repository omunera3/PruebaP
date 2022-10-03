import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private urlapi = 'https://platzi-music-api.herokuapp.com';


  constructor(private http: HttpClient) { }

  getArtists() {
    return dataArtists;
    }

  getNewReleases(): any{
    return this.http.get(`${this.urlapi}/browse/new-releases`);
  }

  getArtistTopTracks(artistId): any {
    console.log(artistId);
    return this.http.get(`${this.urlapi}/artists/${artistId}/top-tracks?country=CO`);
  }
}
