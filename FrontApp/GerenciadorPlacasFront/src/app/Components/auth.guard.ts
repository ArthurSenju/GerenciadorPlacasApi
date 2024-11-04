import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/AuthService'; // ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']); // redireciona para a página de login
      return false;
    }
  }
}
