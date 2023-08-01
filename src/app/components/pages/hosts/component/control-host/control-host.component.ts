import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sedesDTO } from 'src/app/components/cruds/models/sedes/sedesdto';
import { SedesService } from 'src/app/components/services/sedesService';
import { SharedDataService } from 'src/app/components/services/sharedService';


@Component({
  selector: 'app-control-host',
  templateUrl: './control-host.component.html',
  styleUrls: ['./control-host.component.css']
})
export class ControlHostComponent implements OnInit {

  id: number;
  nombre: string;
  idRecibido: number | null = null;
  nombreRecibido: string | null = null;
  updateMode: boolean | null = null;

  constructor(
    private SharedDataService: SharedDataService,
    private sedesService: SedesService,
    private router: Router
  ) {
    // Inicializar propiedades
    this.id = 0;
    this.nombre = '';
  }

  ngOnInit(): void {
    // Obtener datos compartidos del servicio ShareddataService
    this.idRecibido = this.SharedDataService.getIdSeleccionado();
    this.nombreRecibido = this.SharedDataService.getNombreSeleccionado();
    this.updateMode = this.SharedDataService.getUpdateModeEnabled();

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

    console.log('ID seleccionado:', this.id);
  }

   ReturnToTeams(): void {

    this.router.navigate(['/hosts'])
  }

  aceptar(): void {
    if (this.updateMode) 
    {
      // Crear objeto 'pais' con los datos ingresados
      const sede: sedesDTO = {
      sedesDTOid: this.id,
        sedesDTOnombre: this.nombre
      };

      // Realizar solicitud PUT al servicio PaisesService
      this.sedesService.putSedes(this.id, sede).subscribe(
        (response) => 
        {
          console.log('PUT exitoso:', response);
          if(response)
          {
            this.ReturnToTeams();
          }
        },
        (error) => {
          console.error('Error en PUT:', error);
        }
      );

    } 
    else 
    {
      // Crear objeto 'pais' con los datos ingresados
      const sede: sedesDTO = {
        sedesDTOid: this.id,
        sedesDTOnombre: this.nombre
      };
  
      // Realizar solicitud POST al servicio PaisesService
      this.sedesService.postSedess(sede).subscribe(
        (response) => {
          console.log('POST exitoso:', response);
          if(response)
          {
            this.ReturnToTeams();
          }
        },
        (error) => {
          console.error('Error en POST:', error);
        }
      );
    }
  }


  validateInput(): void {
    if (this.id < 0) {
      this.id = 1;
    }
  }
  

}



