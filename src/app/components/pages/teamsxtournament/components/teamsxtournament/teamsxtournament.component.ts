import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { equiposDTO } from 'src/app/components/cruds/models/equipos/equiposdto';
import { competenciasDTO } from 'src/app/components/cruds/models/competencias/competenciasdto';
import { competenciasService } from 'src/app/components/services/competenciasService';
import { equiposxcompetenciaDTO } from 'src/app/components/cruds/models/equiposxcompetencia/equiposxcompetenciadto';
import { equiposxcompetenciaService } from 'src/app/components/services/equiposxcompetenciasService';
import { equiposService } from 'src/app/components/services/equiposService';
import { SharedDataService } from 'src/app/components/services/sharedService';

@Component({
  selector: 'app-teamsxtournament',
  templateUrl: './teamsxtournament.component.html',
  styleUrls: ['./teamsxtournament.component.css']
})
export class TeamsxtournamentComponent implements OnInit
{
  equiposXcompetenciaData: equiposxcompetenciaDTO = new equiposxcompetenciaDTO; // Instancia que almacena los datos de equiposXcompetencia
  equiposData: equiposDTO = new equiposDTO; // Instancia que almacena los datos de los equipos
  competenciaData: competenciasDTO = new competenciasDTO; // Instancia que almacena los datos de las competencias
  datatable: any = []; // Variable para almacenar los datos de la tabla
  elementoNoEncontrado: boolean = false; // Variable para identificar si el elemento pedido se encuentra en la base de datos.
  idSeleccioando: number | null = null; // Almacena el ID del elemento EQUIPO seleccionado en la tabla.
  isUpdateDisabled: boolean = true; // Variable para deshabilitar el botón "UPDATE"
  isDeleteDisabled: boolean = true; // Variable para deshabilitar el botón "ELIMINAR"
  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 0; // Total de páginas
  totalPagesArray: number[] = []; // Variable para almacenar los números de página
  selectedName: string | null = null; // Almacena el nombre de la tabla.
  deleteCheck: boolean = false; // Variable booleana encargada de checkear la accion
  updateModeEnabled: boolean = false; // Variable booleana encargada de detectar el modo actualizacion.
  comboDatatable: any = []; // Variable para almacenar los datos del combo.
  comboEqDatatable: any = []; // Variable para almacenar los datos del combo equipos
  selectedCompetenciaId: number | null = null; // AYUDA A CARGAR LA TABLA PRINCIPAL, CAPTURA LA ID DE LA COMPETENCIA EN COMBO. 
  selectedEquipoId: number | null = null; // AYUDA A CARGAR LA TABLA DE EQUIPOS, CAPTURA EL ID DEL EQUIPO EN COMBO
  idCompetenciaSeleccionada: number | null = null // Toma la ID de la Competencia de un equipo y competencia cargados por onDataTable
  selectedTournamentName: string | null = null; // Variable para almacenar el nombre de la competencia en tabla
  isPostDisabled: boolean = true;

  constructor(private equiposService: equiposService, private competenciasService: competenciasService, private equiposXCompetenciasService: equiposxcompetenciaService, private SharedDataService: SharedDataService, private router: Router)
  {
    // Inyeccion de servicios. 
  }

  ngOnInit(): void {

    this.initCombo();
    this.initEqCombo();
  }

  // TODO: Hacer funcionar todos los metodos faltantes, revisar cualquiera de los ABM funcionales, son todos identicos.
  onDataTable() {
    if (this.selectedCompetenciaId !== null) {
      this.equiposXCompetenciasService.getEquiposXCompetencia(0, this.selectedCompetenciaId, "empty", "empty").subscribe(
        (res) => {
          console.log(res);
          this.datatable = Object.values(res);
          console.log(this.datatable);
          this.calculatePagination();
        }
      );
    } else {
      console.log("No se ha seleccionado ninguna competencia.");
    }
  }
  

  initCombo(){
    this.competenciasService.getCompetencia(0, "empty").subscribe
    (resCombo => 
      {
        console.log( "1. ResCombo" + resCombo) // Imprime la respuesta del servicio en consola
        this.comboDatatable = Object.values(resCombo);
        console.log("2. comoDatatable recién cargada:")
        console.log(this.comboDatatable) // Imprime los valores de la variable en consola.
        
      });
  }

  initEqCombo(){
    this.equiposService.getEquipos(0, "empty").subscribe(resComboEq => {
      console.log("resComboEq cargado. Valores = " + resComboEq);
      this.comboEqDatatable = Object.values(resComboEq);
      console.log("comboEqDatatable cargado.");
      console.log(this.comboEqDatatable);
    })
  }

  // Método para manejar la selección de competencia
  onCompetenciaSelected(): void {

  if (this.selectedCompetenciaId !== null) {
    this.onDataTable();
    
  }
  // Aquí puedes utilizar el ID seleccionado (this.selectedCompetenciaId) en otros métodos
  console.log('ID de la competencia seleccionada:', this.selectedCompetenciaId);
  // Llamar a otros métodos o realizar acciones necesarias con el ID seleccionado
 
  }

  onEquipoSelected(): void{
    if(this.selectedEquipoId !== null){
      this.isPostDisabled = false // La variable ha de igualarse a true una vez completado el proceso de POST para evitar errores de carga.
    }
  }

  calculatePagination(): void {
    const totalItems = this.datatable[0].length; // Total de elementos en la lista
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage); // Calcular el total de páginas
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generar el array de páginas
  }

  getVisibleItems(): any[]{ //TODO (Revisar esquema original)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice inicial de los elementos visibles
    const endIndex = startIndex + this.itemsPerPage; // Índice final de los elementos visibles
    return this.datatable[0].slice(startIndex, endIndex); // Obtener los elementos visibles de la lista
  }
  
  changePage(pageNumber: number): void {
    this.currentPage = pageNumber; // Cambiar a la página seleccionada
  }


  deleteItem(){
    const confirmacion = confirm('¿Seguro de eliminar el equipo ' +  this.selectedName +  'de la '  + this.selectedTournamentName +  '?')
    if(confirmacion){
      this.deleteCheck = true;

      if(this.deleteCheck && this.idSeleccioando != null && this.idCompetenciaSeleccionada != null){
        this.equiposXCompetenciasService.deleteEquiposXCompetencia(this.idSeleccioando, this.idCompetenciaSeleccionada).subscribe(()=>
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

  } //TODO: Hacer luego de hacer funcionar el GET.

  postAndClear(){
    if(this.selectedCompetenciaId && this.selectedEquipoId !== null){
     const equiposXcompetenciaPost: equiposxcompetenciaDTO = {
      idEquipoDTO: this.selectedEquipoId,
      idCompetenciaDTO: this.selectedCompetenciaId
     }
     this.equiposXCompetenciasService.postEquiposXCompetencia(equiposXcompetenciaPost).subscribe(
      (response) => 
      { 
        console.log("POST EXITOSO " + response)
        if(response){
          this.isDeleteDisabled = true;
          this.onDataTable();
        }
      },
      (errorPost) =>{
        console.log("Se ha presentado un ERROR en el post " + errorPost)
      }
     )
    }
   

  } //TODO: Hacer luego de hacer funcionar el GET.


  selectItemAndStoreID(item: any){
    this.datatable[0].forEach((element: any) =>{
      if(element !== item){
        element.seleccionado = false
      } else {
        this.idSeleccioando = item.idEquipo;
        this.selectedName = item.equipoNombre;
        console.log('El metodo selectAndStoreID Funciona, idEquipo = ' + this.idSeleccioando + ' nombre del equipo ' + this.selectedName);
        if(this.idSeleccioando != null && this.selectedName != null ) 
        {
          this.SharedDataService.setIdSeleccionado(this.idSeleccioando);
          this.SharedDataService.setNombreSeleccionado(this.selectedName);
        }
        const selectedItem = this.getSelectedItem();
        this.isUpdateDisabled = !selectedItem
        this.isDeleteDisabled = !selectedItem
      }
    });

  }//TODO:Hacer luego de funcionar el GET.

  selectItemAndStoreIDCompetencia(item: any){
    this.datatable[0].forEach((element: any)=>{
      if(element !== item){
        element.seleccionado = false
      } else {
        this.idCompetenciaSeleccionada = item.idCompetencia;
        this.selectedTournamentName = item.nombreCompetencia;
        console.log('El metodo selectAndStoreIDCompetencia funciona, idCompetencia = ' + this.idCompetenciaSeleccionada + ' nombre de la competencia ' + this.selectedTournamentName)
        if(this.idCompetenciaSeleccionada != null && this.selectedTournamentName != null){
          this.SharedDataService.setIdCompetenciaSeleccionada(this.idCompetenciaSeleccionada);
          this.SharedDataService.setNombreCompetenciaSeleccionada(this.selectedTournamentName);
        }
        const selectedItem = this.getSelectedItem();
        this.isUpdateDisabled = !selectedItem
        this.isDeleteDisabled = !selectedItem
      }
    });
  }//TODO: Hacer luego de funcionar el GET. 


  selectItem(item: any){
    this.datatable[0].forEach((element: any) => {
      if(element !== item) {
        element.seleccionado = false;
      }
    });

    // Verificar si hay algún elemento seleccionado y actualizar el estado de los botones
    const selectedItem = this.getSelectedItem();
    this.isUpdateDisabled = !selectedItem;
    this.isDeleteDisabled = !selectedItem;
  }


  getSelectedItem(): any{
    return this.datatable[0].find((item: any) => item.seleccionado);
  }


}

