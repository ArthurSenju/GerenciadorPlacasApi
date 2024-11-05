import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private authService: AuthService, private router: Router) {}

  entrar() {
    // Autentica o usuário, altere essa parte conforme sua lógica de autenticação
    this.authService.login().subscribe((response) => {
      if (response.success) {
        this.authService.setLoggedIn(true); // Altera o estado de login no serviço
        this.router.navigate(['/home']); // Redireciona para a página principal
      } else {
        // Trate a falha de login, se necessário
      }
    });
  }
}
