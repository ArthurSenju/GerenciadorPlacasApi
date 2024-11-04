import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Placa } from '../Models/PlacaViewModel';


@Injectable({
  providedIn: 'root'
})
export class PlacaService {
  private apiUrl = 'https://localhost:5001/api/Placa';

  constructor(private http: HttpClient) { }

  getAllPlacas(): Observable<Placa[]> {
    return this.http.get<Placa[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Erro ao buscar placas:', error);
        return throwError(error);
      })
    );
  }
}
