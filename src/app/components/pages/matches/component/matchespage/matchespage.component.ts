import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equiposService } from 'src/app/components/services/equiposService';
import { competenciasService } from 'src/app/components/services/competenciasService';
import { SedesService } from 'src/app/components/services/sedesService';
import { partidosGruposService } from 'src/app/components/services/partidosgrupoService';
import { postPartidosGrupoDTO } from 'src/app/components/cruds/models/partidosgrupo/postpartidosgrupodto';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-matchespage',
  templateUrl: './matchespage.component.html',
  styleUrls: ['./matchespage.component.css']
})
export class MatchespageComponent implements OnInit 
{
  idSeleccionadoComboEq: number | null = null; // Almacena el id del equipo seleccionado en tabla mediante checkbox
  idSeleccionadoComboCo: number | null = null; // Almacena el id de la competencia seleccionada en tabla mediante checkbox
  idPartidoSeleccionado: number | null = null; // Almacena el id del partido.
  grupoSeleccionado: string | null = null; // Almacena la letra del grupo.
  gruposDisponibles: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  deleteCheckIsTrue: boolean = false;
  Datatable: any = [];
  comboEqDatatable: any = [];
  comboComDatatable: any = [];
  loadedCompetenciaId: number | null = null;
  loadedEquipoId: number | null = null;
  loadGrupoString: string | null = null;
  isPostDisabled: boolean = true;
  isDeleteDisabled: boolean = true;
  isGroupsDisabled: boolean = true;
  deleteCheck: boolean = false;

  constructor(private equiposService: equiposService, private competenciasService: competenciasService, private partidosGruposService: partidosGruposService, private sedesService: SedesService, private Router: Router){

  }

  ngOnInit(): void {
    this.initComboCom()
    this.initComboEq()
    
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

  onDataTable(){
    if(this.loadedCompetenciaId !== null && this.grupoSeleccionado == null){
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
    this.isPostDisabled = false;
    
  }


  postAndClear(){
    // TODO: Se realiza luego del GET funcional.
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
      console.log('No se han producido cambios');
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

