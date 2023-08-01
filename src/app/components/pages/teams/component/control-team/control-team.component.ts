import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/components/services/sharedService';
import { equiposService } from 'src/app/components/services/equiposService';
import { equiposDTO } from 'src/app/components/cruds/models/equipos/equiposdto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-control-team',
  templateUrl: './control-team.component.html',
  styleUrls: ['./control-team.component.css']
})
export class ControlTeamComponent implements OnInit {

  id: number;
  nombre: string;
  idRecibido: number | null = null;
  nombreRecibido: string | null = null;
  updateMode: boolean | null = null;

  constructor(
    private SharedDataService: SharedDataService,
    private equiposService: equiposService,
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

    this.router.navigate(['/teams'])
  }

  aceptar(): void {
    if (this.updateMode) 
    {
      // Crear objeto 'pais' con los datos ingresados
      const equipo: equiposDTO = {
      equiposDTOid: this.id,
        equiposDTOnombre: this.nombre
      };

      // Realizar solicitud PUT al servicio PaisesService
      this.equiposService.putEquipos(this.id, equipo).subscribe(
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
      const equipo: equiposDTO = {
        equiposDTOid: this.id,
        equiposDTOnombre: this.nombre
      };
  
      // Realizar solicitud POST al servicio PaisesService
      this.equiposService.postEquipos(equipo).subscribe(
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



