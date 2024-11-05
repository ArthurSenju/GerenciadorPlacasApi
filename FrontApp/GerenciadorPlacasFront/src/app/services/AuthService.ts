import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'sua_api_url/aqui'; // Adicione a URL da sua API

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(): Observable<{ success: boolean }> {
    // // Simulação de chamada HTTP
    // return this.http.post<{ success: boolean }>(`${this.apiUrl}/login`, { /* seus dados */ })
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Login falhou', error);
    //       return of({ success: false }); // Retorna um objeto de erro se a chamada falhar
    //     })
    //   );
    return of({ success: true });
  }

  logout() {
    this.loggedIn.next(false); // Atualiza o estado para falso
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value); // Atualiza o estado
  }
}
