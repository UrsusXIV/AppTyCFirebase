import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gruposApuestasDTO } from 'src/app/components/cruds/models/gruposapuestas/gruposApuestas';
import { gruposApuestasService } from 'src/app/components/services/gruposApuestasService';

@Component({
  selector: 'app-betgroups',
  templateUrl: './betgroups.component.html',
  styleUrls: ['./betgroups.component.css']
})
export class BetgroupsComponent implements OnInit
{

  gruposApuestasData: gruposApuestasDTO = new gruposApuestasDTO;
  datatable: any = [];
  idGrupoApuestasSeleccionado: number | null = null;
  isUpdateDisabled: boolean = true;
  isDeleteDisabled: boolean = true;
  isPostDisabled: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  selectedGroup: string | null = null;
  deleteCheck: boolean = false;
  
  idGrupoApPostPut: number = 0;
  grupoDescripcionApPostPut = "";

  constructor( private gruposApuestasService: gruposApuestasService, private router: Router){

  }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable()
  {
    this.gruposApuestasService.getGruposApuestas(0).subscribe(res =>{
      console.log(res);
      this.datatable = Object.values(res);
      console.log(this.datatable);
      this.calculatePagination();
    });
  }

  sendPut()
  {
    if(this.idGrupoApuestasSeleccionado == 0 || this.idGrupoApuestasSeleccionado == null)
    {
      alert("La ID del grupo no se ha seleccionado.")
    }
    else
    {
      if(this.idGrupoApuestasSeleccionado > 0 && this.grupoDescripcionApPostPut !== null)
      {
        const putGruposAp: gruposApuestasDTO =
        {
          idGruposAp: this.idGrupoApuestasSeleccionado,
          grupoApDescripcion: this.grupoDescripcionApPostPut
        
        }
        this.gruposApuestasService.putGruposApuestas(putGruposAp).subscribe
        (
          (response) =>
          {
            console.log('PUT EXITOSO' + response)
            if(response)
            {
              this.onDataTable();
            }
          },
          (errorPut) =>
          {
            console.log("Se ha presentado un ERROR " + errorPut);
          }
        )
      }
    }
  }
  
  deleteItem(): void
  {
    const confirmacion = confirm('¿Estas seguro de eliminar el grupo ' + this.idGrupoApuestasSeleccionado + '?')
    
    if(confirmacion)
    {
      this.deleteCheck = true;

      if(this.deleteCheck && this.idGrupoApuestasSeleccionado != null )
      {
        this.gruposApuestasService.deleteGruposApuestas(this.idGrupoApuestasSeleccionado).subscribe
        (
         () =>
         {
          console.log('Elemento eliminado exitosamente');
          this.onDataTable();
         },
         (error) => 
         {
          console.error('Error al eliminar el elemento:', error);
         }
        );
      }
    } else {
      console.log('No se han realizado cambios');
    }
  }

  getVisibleItems(): any []
  {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.datatable[0].slice(startIndex, endIndex);
  }

  selectItemAndStoreID(item: any) {
    if (item.seleccionado) {
      // Checkbox seleccionado
      this.datatable[0].forEach((element: any) => {
        if (element !== item) {
          element.seleccionado = false;
        } else {
          this.idGrupoApuestasSeleccionado = item.idGruposAp;
          console.log('El método selectItemAndStoreId funciona');
          this.isDeleteDisabled = false;
          this.isUpdateDisabled = false;
          this.isPostDisabled = true;
          console.log("idGrupoApuestasSeleccionado = " + this.idGrupoApuestasSeleccionado)
  
          if (this.idGrupoApuestasSeleccionado != null) {
            // Revisar si necesito el sharedData luego.
          }
          const selectItem = this.getSelectedItem();
        }
      });
    } else {
      this.idGrupoApuestasSeleccionado = null;
      this.isDeleteDisabled = true;
      this.isUpdateDisabled = true;
      this.isPostDisabled = false;
    }
  }
  

  changePage(pageNumber: number): void
  {
    this.currentPage = pageNumber;
  }

  calculatePagination(): void
  {
    const totalItems = this.datatable[0].length;
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1)
  }

  selectItem(item: any)
  {
    this.datatable[0].forEach((element: any) =>
    {
      if(element !== item){
        element.seleccionado = false;
      }
    });
    // Verificar si hay algún elemento seleccionado y actualizar el estado de los botones
    const selectedItem = this.getSelectedItem();
    this.isUpdateDisabled = !selectedItem;
    this.isDeleteDisabled = !selectedItem;
  }

  getSelectedItem(): any
  {
    return this.datatable[0].find((item:any) => item.seleccionado)
  }

  postAndClear(){
    if(this.idGrupoApPostPut == 0 || this.idGrupoApPostPut == null)
    {
      alert("La ID del grupo no se ha seleccionado.")
    }
    else
    {
      if(this.idGrupoApPostPut > 0 && this.idGrupoApPostPut !== null)
      {
        const postGruposAp: gruposApuestasDTO =
        {
          idGruposAp: this.idGrupoApPostPut,
          grupoApDescripcion: this.grupoDescripcionApPostPut
        
        }
        this.gruposApuestasService.postGruposApuestas(postGruposAp).subscribe
        (
          (response) =>
          {
            console.log('POST EXITOSO' + response)
            if(response)
            {
              this.onDataTable();
            }
          },
          (errorPost) =>
          {
            console.log("Se ha presentado un ERROR " + errorPost);
          }
        )
      }
    }
  }
  
}
