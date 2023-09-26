import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/components/services/sharedService';
import { competenciasService } from 'src/app/components/services/competenciasService';
import { competenciasDTO } from 'src/app/components/cruds/models/competencias/competenciasdto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-tournaments',
  templateUrl: './control-tournaments.component.html',
  styleUrls: ['./control-tournaments.component.css']
})
export class ControlTournamentsComponent implements OnInit {
  // Propiedades del componente
  id: number;
  nombre: string;
  idRecibido: number | null = null;
  nombreRecibido: string | null = null;
  updateMode: boolean | null = null;

  constructor(
    private SharedDataService: SharedDataService,
    private competenciasService: competenciasService,
    private router: Router
  ) {
    // Inicializar propiedades.
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
      if (this.idRecibido == 0) {
        this.idRecibido = null;
        this.id = 0;
      }
    }

    if (this.nombreRecibido != null) {
      this.nombre = this.nombreRecibido;
    }

    console.log('ID seleccionado:', this.id);
  }

  // Navegar de vuelta a la lista de torneos
  ReturnToTeams(): void {
    this.router.navigate(['/tournaments']);
  }

  // Manejar la acción de aceptar (Guardar o Actualizar)
  aceptar(): void {
    if (this.updateMode) {
      // Crear objeto 'competencia' con los datos ingresados
      const competencia: competenciasDTO = {
        competenciasDTOid: this.id,
        competenciasDTOnombre: this.nombre
      };

      // Realizar solicitud PUT al servicio competenciasService para actualizar
      this.competenciasService.putCompetencia(this.id, competencia).subscribe(
        (response) => {
          console.log('PUT exitoso:', response);
          if (response) {
            this.ReturnToTeams();
          }
        },
        (error) => {
          console.error('Error en PUT:', error);
        }
      );

    } else {
      // Crear objeto 'competencia' con los datos ingresados
      const competencia: competenciasDTO = {
        competenciasDTOid: this.id,
        competenciasDTOnombre: this.nombre
      };

      // Realizar solicitud POST al servicio competenciasService para crear
      this.competenciasService.postCompetencia(competencia).subscribe(
        (response) => {
          console.log('POST exitoso:', response);
          if (response) {
            this.ReturnToTeams();
          }
        },
        (error) => {
          console.error('Error en POST:', error);
        }
      );
    }
  }

  // Validar la entrada de datos (si el ID es menor que 0, establecerlo en 1)
  validateInput(): void {
    if (this.id < 0) {
      this.id = 1;
    }
  }
}
