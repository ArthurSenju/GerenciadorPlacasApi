import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Placa } from '../Models/PlacaViewModel';


@Injectable({
  providedIn: 'root'
})
export class PlacaService {
  private apiUrl = 'https://localhost:5001/api/placa';

  constructor(private http: HttpClient) { }

  GetAllPlacas(): Observable<Placa[]> {
    return this.http.get<Placa[]>(`${this.apiUrl}/getAll`).pipe(
      catchError(error => {
        console.error('Erro ao buscar placas:', error);
        return throwError(error);
      })
    );
  }

  ObterPorId(id: number) : Observable<Placa>{
    return this.http.get<Placa>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar a placa', error)
        return throwError(error);
      })
    )
  }

  Salvar(Placa: Placa): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/salvar`, Placa)
      .pipe(
        catchError((error) => {
          console.error('Erro ao Salvar', error);
          return throwError(error); // Retorna um Observable com o valor 0 em caso de erro
        })
      );
  }
}
