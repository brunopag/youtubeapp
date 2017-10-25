import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

// Variable declarada para poder usar el jquery del modal de bootstrap. Si no se declara falla.
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  videos:any[] = [];
  videoSel:any;

  constructor(public _yts:YoutubeService) {

    // se llama a la funcion getVideos del servicio y se subscribe para recibir los videos.
    this._yts.getVideos().subscribe(videos => {
      console.log(videos);
      this.videos = videos;
    });
  }

  verVideo( video:any ){
    // Al hacer click en ver video, se asigna el video a la variable video seleccionado, que luego lo mostrará el modal.
    this.videoSel = video;
    // Llamada al modal de bootstrap
    $('#myModal').modal();
  }

  cerrarModal(){
    // poner el video seleccionado en null
    this.videoSel = null;
    // Llamada al metodo de bootrstap para cerrar al modal
    $('#myModal').modal('hide');
  }

  cargarMas(){
    console.log("cargarMas() llamado")
    this._yts.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }

}
