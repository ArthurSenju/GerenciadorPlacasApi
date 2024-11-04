import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../app/Components/menu/menu.component'
import { CommonModule } from '@angular/common';
import { AuthService } from './services/AuthService';
import { InicioComponent } from './Components/Login/inicio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, MenuComponent, CommonModule, InicioComponent]  // Importa o RouterModule aqui
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  showMenu = false; // Controla a exibição do menu

  toggleMenu(show: boolean) {
    this.showMenu = show; // Atualiza o estado do menu
  }
}
