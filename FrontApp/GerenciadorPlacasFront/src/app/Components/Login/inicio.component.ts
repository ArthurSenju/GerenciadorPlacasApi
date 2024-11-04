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

  onLogin() {
    this.authService.login();
    this.router.navigate(['/home']); // Redireciona para a tela inicial (ou home)
  }
}
