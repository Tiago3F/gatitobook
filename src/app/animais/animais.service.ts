import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animais, Animal } from './animais';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURL
const NOT_MODIFIELD = '304'

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    // Removido pois foi adicionado o INTERCEPTOR
    // const token = this.tokenService.retornaToken()
    // const headers = new HttpHeaders().append('x-access-token', token)
    //  return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`, {headers: headers})
    return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`)
  }

  buscaPorId(id: number): Observable<Animal> {
    // Removido pois foi adicionado o INTERCEPTOR
    // const token = this.tokenService.retornaToken()
    // const headers = new HttpHeaders().append('x-access-token', token)
    // return this.httpClient.get<Animal>(`${API}/photos/${id}`, { headers: headers })
    return this.httpClient.get<Animal>(`${API}/photos/${id}`)
  }

  curtirAnimal(id: number): Observable<boolean> {
    return this.httpClient.post(`${API}/photos/${id}/like`, {}, { observe: 'response' }).pipe(
      mapTo(true), catchError((error) => {
        return error.status === NOT_MODIFIELD ? of(false) : throwError(error)
      }))
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`)
  }

}
