import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/AuthService'; // ajuste o caminho conforme necessário
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn$.pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']); // redireciona para a página de login
          return false;
        }
      })
    );
  }
}
