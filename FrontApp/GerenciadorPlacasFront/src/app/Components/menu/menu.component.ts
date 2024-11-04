import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private authService: AuthService, private router: Router) {}  
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  toggleIconMenu() {
    const menu = document.getElementById('menu-container');
    const icon = document.getElementById('menu-icon');

    // Alterna a classe 'hidden' para mostrar/ocultar o menu
    menu?.classList.toggle('hidden');

    // Muda o ícone com base no estado do menu
    if (menu?.classList.contains('hidden')) {
      icon?.classList.replace('bi-arrow-left', 'bi-list'); // Ícone de menu
    } else {
      icon?.classList.replace('bi-list', 'bi-arrow-left'); // Ícone de seta
    }
  }


}
