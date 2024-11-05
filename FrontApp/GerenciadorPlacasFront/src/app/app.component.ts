import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/AuthService';
import { InicioComponent } from './Components/Login/inicio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, InicioComponent]  // Importa o RouterModule aqui
})
export class AppComponent {
  isLoggedIn = false;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = document.getElementsByClassName('main-container');
    const icon = document.getElementById('menu-icon');
    if(this.isMenuOpen == false){
      icon?.classList.replace('bi-arrow-left', 'bi-list');
    }else{
      icon?.classList.replace('bi-list', 'bi-arrow-left');
    }
  }

  constructor(private authService: AuthService, private router: Router) {
    // Inscreve-se para mudanças no estado de login
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redireciona para a página principal
  }

   // Array com as páginas e suas respectivas rotas
   menuItems = [
    { label: 'Página Inicial', route: '/home' },
    { label: 'Gerenciar Placas', route: '/placas' }
    // Adicione outros itens conforme necessário
  ];
}
