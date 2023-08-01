import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apostadoresDTO } from 'src/app/components/cruds/models/apostadoresdto';
import { apostadoresService } from 'src/app/components/services/apostadoresService';
import { SharedDataService } from 'src/app/components/services/sharedService';

@Component({
  selector: 'app-control-gamblers',
  templateUrl: './control-gamblers.component.html',
  styleUrls: ['./control-gamblers.component.css']
})
export class ControlGamblersComponent implements OnInit 
{

  id: number;
  nombre: string;
  puntos: number;
  mail: string;
  mailRecibido: string | null = null;
  idRecibido: number | null = null;
  nombreRecibido: string | null = null;
  updateMode: boolean | null = null;
  puntajeRecibido: number | null = null;
  emailValidado: boolean = false;

  constructor(
    private SharedDataService: SharedDataService,
    private apostadoresService: apostadoresService,
    private router: Router
  ) {
    // Inicializar propiedades
    this.id = 0;
    this.nombre = '';
    this.puntos = 0;
    this.mail = '';
  }

  ngOnInit(): void {
    // Obtener datos compartidos del servicio ShareddataService
    this.idRecibido = this.SharedDataService.getIdSeleccionado();
    this.nombreRecibido = this.SharedDataService.getNombreSeleccionado();
    this.updateMode = this.SharedDataService.getUpdateModeEnabled();
    this.mailRecibido = this.SharedDataService.getEmailSeleccionado();

    console.log("UpdateMode se encuentra en" + this.updateMode);

    if (this.idRecibido != null) {
      this.id = this.idRecibido;
      if(this.idRecibido == 0){
        this.idRecibido = null;
        this.id = 0;
      }
    }

    if (this.nombreRecibido != null) {
      this.nombre = this.nombreRecibido;
    }

    if (this.mailRecibido != null){
      this.mail = this.mailRecibido;
    }

    console.log('ID seleccionado:', this.id);
  }

   ReturnToTeams(): void {

    this.router.navigate(['/gamblers'])
  }

  aceptar(): void {
    this.emailValidado = this.validateMail(this.mail);
  
    if (this.emailValidado) {
      if (this.updateMode) {
        // Crear objeto 'pais' con los datos ingresados
        const apostadores: apostadoresDTO = {
          apostadoresDTOid: this.id,
          apostadoresDTOnombre: this.nombre,
          apostadoresDTOpuntos: this.puntos,
          apostadoresDTOmail: this.mail
        };
  
        // Realizar solicitud PUT al servicio PaisesService
        this.apostadoresService.putApostadores(this.id, apostadores).subscribe(
          (response) => {
            console.log('PUT exitoso:', response);
            if (response) {
              this.emailValidado = false;
              this.ReturnToTeams();
            }
          },
          (error) => {
            console.error('Error en PUT:', error);
          }
        );
      } else {
        // Crear objeto 'pais' con los datos ingresados
        const apostadores: apostadoresDTO = {
          apostadoresDTOid: this.id,
          apostadoresDTOnombre: this.nombre,
          apostadoresDTOpuntos: this.puntos,
          apostadoresDTOmail: this.mail
        };
  
        // Realizar solicitud POST al servicio PaisesService
        this.apostadoresService.postApostadores(apostadores).subscribe(
          (response) => {
            console.log('POST exitoso:', response);
            if (response) {
              this.emailValidado = false;
              this.ReturnToTeams();
            }
          },
          (error) => {
            console.error('Error en POST:', error);
          }
        );
      }
    } else {
      alert('Mail Invalido');
    }
  }
  


  validateInput(): void {
    if (this.id < 0) {
      this.id = 1;
    }
  }

  validateMail(inputMail: string): boolean {
    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-\u00C0-\u024F\u1E00-\u1EFF\u00C0-\u017F]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Verificar si el inputMail cumple con la expresión regular
    const isValid = emailRegex.test(inputMail);
  
    // Devolver true si el correo es válido, o false si no cumple con los criterios
    return isValid;
  }
  
  
}
