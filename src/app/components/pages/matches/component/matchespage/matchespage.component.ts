import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equiposService } from 'src/app/components/services/equiposService';
import { competenciasService } from 'src/app/components/services/competenciasService';
import { SedesService } from 'src/app/components/services/sedesService';
import { partidosGruposService } from 'src/app/components/services/partidosgrupoService';
import { postPartidosGrupoDTO } from 'src/app/components/cruds/models/partidosgrupo/postpartidosgrupodto';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';


@Component({
  selector: 'app-matchespage',
  templateUrl: './matchespage.component.html',
  styleUrls: ['./matchespage.component.css']
})
export class MatchespageComponent implements OnInit 
{
  datePickerConfig: Partial<BsDatepickerConfig> = Object.assign({}, {containerClass: 'theme-dark-blue'});
  idSeleccionadoComboEq: number | null = null; // Almacena el id del equipo seleccionado en tabla mediante checkbox
  idSeleccionadoComboCo: number | null = null; // Almacena el id de la competencia seleccionada en tabla mediante checkbox
  idPartidoSeleccionado: number | null = null; // Almacena el id del partido.
  grupoSeleccionado: string | null = null; // Almacena la letra del grupo.
  gruposDisponibles: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];
  horarioSeleccionado: string | null = null; // Almacena el horario del partido
  arrayHorario: string[] = [
    "00:00:00", "00:15:00", "00:30:00", "00:45:00", "01:00:00", "01:15:00",
    "01:30:00", "01:45:00", "02:00:00", "02:15:00", "02:30:00", "02:45:00",
    "03:00:00", "03:15:00", "03:30:00", "03:45:00", "04:00:00", "04:15:00",
    "04:30:00", "04:45:00", "05:00:00", "05:15:00", "05:30:00", "05:45:00",
    "06:00:00", "06:15:00", "06:30:00", "06:45:00", "07:00:00", "07:15:00",
    "07:30:00", "07:45:00", "08:00:00", "08:15:00", "08:30:00", "08:45:00",
    "09:00:00", "09:15:00", "09:30:00", "09:45:00", "10:00:00", "10:15:00",
    "10:30:00", "10:45:00", "11:00:00", "11:15:00", "11:30:00", "11:45:00",
    "12:00:00", "12:15:00", "12:30:00", "12:45:00", "13:00:00", "13:15:00",
    "13:30:00", "13:45:00", "14:00:00", "14:15:00", "14:30:00", "14:45:00",
    "15:00:00", "15:15:00", "15:30:00", "15:45:00", "16:00:00", "16:15:00",
    "16:30:00", "16:45:00", "17:00:00", "17:15:00", "17:30:00", "17:45:00",
    "18:00:00", "18:15:00", "18:30:00", "18:45:00", "19:00:00", "19:15:00",
    "19:30:00", "19:45:00", "20:00:00", "20:15:00", "20:30:00", "20:45:00",
    "21:00:00", "21:15:00", "21:30:00", "21:45:00", "22:00:00", "22:15:00",
    "22:30:00", "22:45:00", "23:00:00", "23:15:00", "23:30:00", "23:45:00"
  ];  
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  deleteCheckIsTrue: boolean = false;
  Datatable: any = [];
  comboEqDatatable: any = [];
  comboComDatatable: any = [];
  comboSedDatatable: any = [];
  loadedSedeId: number | null = null;
  loadedCompetenciaId: number | null = null;
  loadedEquipoIdL: number | null = null;
  loadedEquipoIdV: number | null = null;
  loadGrupoString: string | null = null;
  isPostDisabled: boolean = true;
  isDeleteDisabled: boolean = true;
  isGroupsDisabled: boolean = true;
  deleteCheck: boolean = false;
  selectedDate: Date | null = null;
  selectedTime: Date = new Date();
  golesL: number = 0;
  golesV: number = 0;
  puntosL: number = 0;
  puntosV: number = 0;
  estadoPartido: number = 0;

  constructor(
    private equiposService: equiposService, 
    private competenciasService: competenciasService, 
    private partidosGruposService: partidosGruposService, 
    private sedesService: SedesService, 
    private Router: Router){

  }

  ngOnInit(): void {
    this.initComboCom()
    this.initComboEq()
    this.initComboSed()
    
  }

  initComboCom(){
    this.competenciasService.getCompetencia(0, "empty").subscribe(resComCombo =>
      {
        console.log("1- resComCombo " + resComCombo)
        this.comboComDatatable = Object.values(resComCombo);
        console.log("2 comboComDatatable recien cargado")
        console.log(this.comboComDatatable)
      });
  }

  initComboEq(){
    this.equiposService.getEquipos(0, "empty").subscribe(resComboEq =>
      {
        console.log("1.- resComboEq " + resComboEq)
        this.comboEqDatatable = Object.values(resComboEq);
        console.log("2.- comboEqDatatable cargado");
        console.log(this.comboEqDatatable);
      });
  }

  initComboSed(){
    this.sedesService.getSedes(0, "empty").subscribe(resComboSed =>
    {
      console.log("1.- resComboSed " + resComboSed)
      this.comboSedDatatable = Object.values(resComboSed);
      console.log("2.- comboSedDatatable cargado");
      console.log(this.comboSedDatatable);

    })
  }

  onDataTable(){
    if(this.loadedCompetenciaId !== null){
      this.idSeleccionadoComboCo = this.loadedCompetenciaId;
      this.grupoSeleccionado = "getall";
      this.partidosGruposService.getPartidosGrupo(0, this.idSeleccionadoComboCo, this.grupoSeleccionado).subscribe(
        (resDatatable) =>{
          console.log(resDatatable);
          this.Datatable = Object.values(resDatatable);
          console.log(this.Datatable);
          this.calculatePagination()
        }
      )
    }
  }


  onCompetenciaSelected(): void{
    if(this.loadedCompetenciaId !== null){
      this.grupoSeleccionado = null;
      this.isGroupsDisabled = false;
      this.onDataTable()
    }
  }

  onGrupoSelected(): void{
    console.log("Grupo se encuentra posicionado en  " + this.grupoSeleccionado)
    if(this.horarioSeleccionado == null){
      alert('El partido no tiene horario establecido.')
    };
    
  }

  

  postAndClear(){
    if(this.grupoSeleccionado == null || this.horarioSeleccionado == null || this.loadedCompetenciaId == null || this.loadedEquipoIdL == null || this.loadedEquipoIdV == null || this.loadedSedeId == null)
    {
      alert("Uno, o mas elementos requeridos para agregar un partido no se han establecido")
    }
    else
    {
      if(this.loadedCompetenciaId !== null && this.loadedEquipoIdL !== null && this.loadedEquipoIdV !== null && this.loadedSedeId !== null && this.grupoSeleccionado !== null && this.horarioSeleccionado !== null && this.selectedDate !== null)
      {
        const postPartidos: postPartidosGrupoDTO = 
        {
          
          PartIDCompetencia: this.loadedCompetenciaId,
          PartIDEquipoL: this.loadedEquipoIdL,
          PartIDEquipoV: this.loadedEquipoIdV,
          PartIDSede: this.loadedSedeId,
          PartHoraTime: this.horarioSeleccionado,
          PartGrupo: this.grupoSeleccionado,
          PartFechaDate: this.selectedDate?.toISOString(),
          PartGolesL:  this.golesL = 0,
          PartGolesV: this.golesV = 0,
          PartPuntosL: this.puntosL = 0,
          PartPuntosV: this.puntosV = 0,
          PartIDEstado: this.estadoPartido = 1
          
        }
        this.partidosGruposService.postPartidosGrupo(postPartidos).subscribe(
          (response) =>
          {
            console.log('POST EXITOSO' + response)
            if(response){
              this.onDataTable();
            }
          },
          (errorPost) =>{
            console.log("Se ha presentado un ERROR. " + errorPost)
          }
        )
      }

    }
  }

  deleteItem(){
    const confirmacion = confirm('¿Seguro de eliminar el partido ' +  this.idPartidoSeleccionado + '?')
    if(confirmacion){
      this.deleteCheck = true;

      if(this.deleteCheck && this.idPartidoSeleccionado != null ){
        this.partidosGruposService.deletePartidosGrupo(this.idPartidoSeleccionado).subscribe(()=>
        {
           console.log('Elemento eliminado exitosamente');

          this.onDataTable(); // Reitera la tabla
        },
        (error) =>{
          console.error('Se ha producido un error de tipo ', error)
        });
      }

    } else {
      console.log('No se han producido cambios'); // PULL?
    }

  }

  calculatePagination(): void {
    const totalItems = this.Datatable[0].length; // Total de elementos en la lista
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage); // Calcular el total de páginas
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generar el array de páginas
  }

  getVisibleItems(): any[] {
    const starIndex = (this.currentPage -1) * this.itemsPerPage;
    const endIndex = starIndex + this.itemsPerPage;
    return this.Datatable[0].slice(starIndex, endIndex);

  }

  selectItemAndStoreID(item: any){
    this.Datatable[0].forEach((element: any) =>{
      if(element !== item){
        element.seleccionado = false
      } else {
        this.idPartidoSeleccionado = item.partIDPartido
        console.log("ID almacenada es igual a " + this.idPartidoSeleccionado)
      }
    });
    if(this.idPartidoSeleccionado != null){
      this.isDeleteDisabled = false;
    }
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber

  }

}

// BACKUP 7/11/2023