import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {
  // Removido por conta do RESOLVER
  // animais$ !: Observable<Animais>

  // constructor(private usuarioService: UsuarioService, private animaisService: AnimaisService) { }

  // ngOnInit(): void {
  //   this.animais$ = this.usuarioService.retornaUsuario().pipe(
  //     switchMap((usuario) => {
  //       const userName = usuario.name ?? ''
  //       return this.animaisService.listaDoUsuario(userName)
  //     })
  //   )
  // }

  animais!: Animais

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.animais = this.activatedRoute.snapshot.data['animais']
    })
  }

}
