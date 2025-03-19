import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('videoElement', { static: false }) videoElement?: ElementRef<HTMLVideoElement>;

  cameras: MediaDeviceInfo[] = [];
  currentStream: MediaStream | null = null;
  showModal = false;
  noCamerasAvailable = false;

  ngAfterViewInit(): void {
    this.getCameras();
  }

  // Função para obter todas as câmeras disponíveis
  getCameras(): void {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.cameras = devices.filter(device => device.kind === 'videoinput');
        this.noCamerasAvailable = this.cameras.length === 0;
      })
      .catch(error => {
        console.error('Erro ao listar dispositivos de mídia: ', error);
        this.noCamerasAvailable = true;
      });
  }

  // Função para iniciar a câmera
  startCamera(deviceId: string): void {
    this.showModal = false;
    console.log(this.showModal)
    this.closeModal(); // Fecha a modal após a seleção da câmera
    const constraints = {
      video: { deviceId: { exact: deviceId } }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (this.videoElement) {
          const video = this.videoElement.nativeElement;
          video.srcObject = stream;
          video.play();
        }
        this.currentStream = stream;
      })
      .catch((error) => {
        console.error('Erro ao acessar a câmera: ', error);
      });
  }

  // Função para abrir a modal
  openCameraModal(): void {
    this.getCameras();
    this.showModal = true; // Abre a modal
  }

  // Função para fechar a modal
  closeModal(): void {
    console.log('fechar')
    this.showModal = false;    
  }

  // Método trackBy para otimizar o *ngFor
  trackByDeviceId(index: number, camera: MediaDeviceInfo): string {
    return camera.deviceId;
  }
}
