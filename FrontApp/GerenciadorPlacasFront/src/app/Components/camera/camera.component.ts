import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('video', { static: true }) video?: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if(this.video != null){
          this.video.nativeElement.srcObject = stream;
          this.video?.nativeElement.play();
        }
      })
      .catch((error) => console.error('Erro ao acessar a câmera: ', error));
  }
}
