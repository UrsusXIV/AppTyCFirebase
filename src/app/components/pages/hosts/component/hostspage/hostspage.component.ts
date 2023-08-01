import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sedesDTO } from 'src/app/components/cruds/models/sedes/sedesdto';
import { SedesService } from 'src/app/components/services/sedesService';
import { SharedDataService } from 'src/app/components/services/sharedService';


@Component({
  selector: 'app-hostspage',
  templateUrl: './hostspage.component.html',
  styleUrls: ['./hostspage.component.css']
})
export class HostspageComponent implements OnInit {

  sedeData: sedesDTO = new sedesDTO; // Instancia que almacena los datos de las sedes
  datatable: any = []; // Variable para almacenar los datos de la tabla
  elementoNoEncontrado: boolean = false; // Variable para identificar si el elemento buscado se encuentra en base de datos.
  idSeleccionado: number | null = null; // Almacena el ID del elemento seleccionado en la tabla. Es de tipo number o null.
  isUpdateDisabled: boolean = true; // Variable para deshabilitar el botón "UPDATE"
  isDeleteDisabled: boolean = true; // Variable para deshabilitar el botón "ELIMINAR"
  itemsPerPage: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 0; // Total de páginas
  totalPagesArray: number[] = []; // Variable para almacenar los números de página
  selectedName: string | null = null; // Almacena el nombre de la tabla.
  deleteCheck: boolean = false; // Variable booleana encargada de checkear la accion
  updateModeEnabled: boolean = false; // Variable booleana encargada de detectar el modo actualizacion.


  constructor( private sedesService: SedesService, private sharedDataService: SharedDataService, private router: Router )
  {
    // Inyeccion de servicios.
  }

  
  ngOnInit(): void {
    this.onDataTable(); // Llamada al método para obtener los datos de la tabla al inicializar el componente
    
  } //TODO (Revisar esquema original)

  

  onDataTable(){
    // Obtener los datos de la tabla mediante el servicio PaisesService
    this.sedesService.getSedes(0, "empty").subscribe(res => {
      console.log(res); // Imprime la respuesta del servicio en la consola
      this.datatable = Object.values(res); // Asigna los valores de la respuesta a la variable datatable
      console.log(this.datatable); // Imprime los valores de la variable datatable en la consola
      this.calculatePagination();
    });

  }  
  searchItem(): void{
    if (this.sedeData.sedesDTOid) 
    {
      // Buscar un elemento específico según el ID proporcionado
      this.sedesService.getSedes(this.sedeData.sedesDTOid, "empty").subscribe(res => 
      {
        console.log(res); // Imprimir el objeto res en la consola
        if ((res as any).sede.length === 0) 
        {
          // El objeto res está vacío, el elemento no se encontró en la base de datos
          this.elementoNoEncontrado = true;
          this.datatable = [];
        } 

        else 
        {
          // Se encontró el elemento en la base de datos
          this.elementoNoEncontrado = false;
          this.datatable = Object.values(res);
        }
      });
    } 
    
    else 
    {
      // No se proporcionó un ID, obtener todos los elementos de la tabla
      this.onDataTable();
    }

  } //TODO (Revisar esquema original, metodo buscarItem)

  clearPostData(){ //TODO (Revisar esquema original)

    this.idSeleccionado = 0;
    this.selectedName = 'Sede a añadir';
    this.sharedDataService.setIdSeleccionado(this.idSeleccionado);
    this.sharedDataService.setNombreSeleccionado(this.selectedName);


  }

  enableUpdateMode(){ //TODO (Revisar esquema original)
    this.updateModeEnabled = true;
    this.sharedDataService.setUpdateModeEnabled(this.updateModeEnabled);

  }

  deleteItem(): void{ //TODO (Revisar esquema original, metodo con el nombre borrarElemento)
    const confirmacion = confirm('¿Estás seguro de eliminar el elemento ' + this.selectedName + '?');
  
    if (confirmacion) {
      this.deleteCheck = true;
  
      if (this.deleteCheck && this.idSeleccionado != null && this.selectedName != null) {
        // Llamada al método deletePaies() del servicio PaisesService pasando el ID y el nombre del equipo
        this.sedesService.deleteSede(this.idSeleccionado, this.selectedName).subscribe(
          () => {
            console.log('Elemento eliminado exitosamente');
            // Realiza alguna acción adicional después de eliminar el elemento
            this.onDataTable(); // Reiterar tabla
          },
          (error) => {
            console.error('Error al eliminar el elemento:', error);
          }
        );
      }
    } else {
      console.log('No se han realizado cambios');
      // Muestra una ventana emergente con el mensaje "No se han realizado cambios"
    }

  }

  getVisibleItems(): any[]{ //TODO (Revisar esquema original)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice inicial de los elementos visibles
    const endIndex = startIndex + this.itemsPerPage; // Índice final de los elementos visibles
    return this.datatable[0].slice(startIndex, endIndex); // Obtener los elementos visibles de la lista
  } 

  selectItemAndStoreID(item: any) {
    // Iterar sobre los elementos de datatable y marcar como no seleccionados aquellos que no son el elemento seleccionado
    // Además, almacenar el ID del elemento seleccionado en idSeleccionado
    this.datatable[0].forEach((element: any) => {
      if (element !== item) {
        element.seleccionado = false;
      } else {
        this.idSeleccionado = item.sedeID;
        console.log("El metodo selectItemAndStoreID funciona");
        if (this.idSeleccionado != null) {
          this.sharedDataService.setIdSeleccionado(this.idSeleccionado);
        }
        const selectedItem = this.getSelectedItem();
        this.isUpdateDisabled = !selectedItem;
        this.isDeleteDisabled = !selectedItem;
      }
    });
  }

  selectItemAndStoreNombre(item: any) {
    // Iterar sobre los elementos de datatable y marcar como no seleccionados aquellos que no son el elemento seleccionado
    // Además, almacenar el nombre del elemento seleccionado en selectedName
    this.datatable[0].forEach((element: any) => {
      if (element !== item) {
        element.seleccionado = false;
      } else {
        this.selectedName = item.sedeNombre;
        console.log("El método selectItemAndStoreNombre funciona");
        if (this.selectedName != null) {
          this.sharedDataService.setNombreSeleccionado(this.selectedName);
        }
      }
    });
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber; // Cambiar a la página seleccionada
  }

  calculatePagination(): void {
    const totalItems = this.datatable[0].length; // Total de elementos en la lista
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage); // Calcular el total de páginas
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generar el array de páginas
  }

  selectItem(item: any){
    // Iterar sobre los elementos de datatable y marcar como no seleccionados aquellos que no son el elemento seleccionado
    this.datatable[0].forEach((element: any) => {
      if (element !== item) {
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

