import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/components/services/sharedService';

interface Usuario {
  id: number
  nombre: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sharedDataService: SharedDataService){

  }
  idUsuario: number | null = null;
  usuarios: Usuario[] = [ {id: 1, nombre: "Usuario 1"}, {id:2, nombre: "Usuario 2"}, {id: 3, nombre: "Usuario 3"}, {id: 4, nombre: "KIKO"}]

  selectUsuario(usuario: Usuario): void {
    this.idUsuario = usuario.id;
    console.log(`Usuario seleccionado: ${usuario.nombre} con ID ${usuario.id}`);

    if(this.idUsuario != null){
      this.sharedDataService.setIdUsuario(this.idUsuario);
    }
  }

}
