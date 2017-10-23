import { Injectable } from '@angular/core';

// http se importa para el get y URLSearchParams para setearle parametros a la url que se le pasa al http
import { Http, URLSearchParams } from '@angular/http';

// Importacion para usar la funcion map()
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  youtubeUrl:string = "https://www.googleapis.com/youtube/v3/playlistItems";
  apiKey:string = "AIzaSyDA5pmso4Hlf_d0tNiRf9sR3tE5x10c130";

  private nextPageTocken:string = "";

  constructor( public http:Http ) { }

  getVideos(){

    // Objeto al que se le setean los parametros
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', 'UUMIb8--yPdP32qOiyZXG-eg');
    params.set('key', this.apiKey);

    // llamada al http pasandole la url y los parametros
    return this.http.get(this.youtubeUrl, {search: params})
      .map( res => {
      console.log(res.json());
      this.nextPageTocken = res.json().nextPageTocken;

      // se crea un arreglo con todos los snippet de la respuesta a la llamada http, cada snippet tiene un video
      let videos:any = [];

      for(let video of res.json().items){
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    })
  }

}
