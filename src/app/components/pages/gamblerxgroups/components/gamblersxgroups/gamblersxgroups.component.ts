import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apostadoresxgrupoDTO } from 'src/app/components/cruds/models/apostadoresxgrupo/apostadoresxgrupo';
import { apostadersxgrupoService } from 'src/app/components/services/apostadoresxgrupoService';
import { apostadoresDTO } from 'src/app/components/cruds/models/apostadoresdto';
import { apostadoresService } from 'src/app/components/services/apostadoresService';
import { gruposApuestasDTO } from 'src/app/components/cruds/models/gruposapuestas/gruposApuestas';
import { gruposApuestasService } from 'src/app/components/services/gruposApuestasService';
import { SharedDataService } from 'src/app/components/services/sharedService'; // Es probable que no lo use.
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

@Component({
  selector: 'app-gamblersxgroups',
  templateUrl: './gamblersxgroups.component.html',
  styleUrls: ['./gamblersxgroups.component.css']
})
export class GamblersxgroupsComponent implements OnInit 
{
  apostadoresXgruposData: apostadoresxgrupoDTO = new apostadoresxgrupoDTO;
  apostadoresData: apostadoresDTO = new apostadoresDTO;
  gruposApuestasData: gruposApuestasDTO = new gruposApuestasDTO;
  datatable: any = []; 
  elementoNoEncontrado: boolean = false;
  idSeleccionado: number | null = null;
  isPostDisabled: boolean = true;
  isDeleteDisabled: boolean = true;
  itemsPerPage: number = 10;
  currentPage: number = 1
  totalPages: number = 0;
  totalPagesArray: number[] =[];
  selectedName: string | null = null;
  deleteCheck: boolean = false;
  comboGroupDatatable: any = [];
  comboGamblerDatatable: any = [];
  selectedGroupId: number | null = null;
  selectedGamblerId: number | null = null;
  idGrupoSeleccionado: number | null = null;
  selectedGroupName: string | null = null;

  constructor(private ApostadoresXGruposService: apostadersxgrupoService, private apostadoresService: apostadoresService, private gruposService: gruposApuestasService)
  {

  }

  ngOnInit(): void 
  {
    this.initComboGam();
    this.initComboGr();
    
  }

  onDataTable()
  {
    if(this.selectedGroupId !== null){
      this.ApostadoresXGruposService.getApostadoresXGrupo(this.selectedGroupId).subscribe(
        (res) => 
        {
          console.log(res);
          this.datatable = Object.values(res);
          console.log(this.datatable);
          this.calculatePagination();
        }
      );
    } else {
      console.log("No se ha seleccionado un grupo");
    }
  }

  initComboGam()
  {
    this.apostadoresService.getApostadores(0, "empty", "empty").subscribe(
      resCombo =>
      {
        console.log("resCombo = " + resCombo);
        this.comboGamblerDatatable = Object.values(resCombo);
        console.log("2- comboGroupDatatable recien cargado")
        console.log(this.comboGamblerDatatable)
      });
  };

  initComboGr()
  {
    this.gruposService.getGruposApuestas(0).subscribe(resComboGr=> {
      console.log("resComboGr cargado. Valor = " + resComboGr);
      this.comboGroupDatatable = Object.values(resComboGr);
      console.log("comboGroupDatatable cargado");
      console.log(this.comboGroupDatatable)
    });
  }

  onGroupSelected(): void{
    if(this.selectedGroupId !== null)
    {
      this.onDataTable();
    }
  }

  onGamblerSelected(): void {
    if(this.selectedGamblerId !== null){
      this.isPostDisabled = false
    }
  }

  calculatePagination(): void {
    const totalItems = this.datatable[0].length;
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages}, (_, i) => i + 1);

  }

  getVisibleItems(): any[]
  {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.datatable[0].slice(startIndex, endIndex);
  }

  changePage(pageNumber: number): void{
    this.currentPage = pageNumber
  }

  deleteItem(){
    const confirmacion = confirm('¿Seguro de eliminar el apostador? ' + this.selectedName + 'de la ' + this.selectedGroupName + '?');
    if(confirmacion)
    {
      this.deleteCheck = true;

      if(this.deleteCheck && this.idSeleccionado != null && this.idGrupoSeleccionado)
      {
        this.ApostadoresXGruposService.deleteApostadoresXGrupo(this.idGrupoSeleccionado, this.idSeleccionado).subscribe(()=>
        {
          console.log('Elemento eliminado exitosamente')
        },
        (error) =>
        {
          console.error('Se ha producido un error del tipo ', error)
        });
      }
    } else {
      console.log("No se han producido cambios");
    }
  }
  postAndClear()
  {
    if(this.selectedGroupId && this.selectedGamblerId !== null)
    {
      const ApostadoresXGruposPost: apostadoresxgrupoDTO = {
        idApostador: this.selectedGamblerId,
        idGruposAp: this.selectedGroupId
      }
      this.ApostadoresXGruposService.postApostadoresXGrupo(ApostadoresXGruposPost).subscribe(
        (response) => 
        {
          console.log('POST EXITOSO' + response)
          if(response){
            this.isDeleteDisabled = true;
            this.onDataTable();
          }
        },
        (errorPost) =>{
          console.log("Se ha presentado un error en el post " + errorPost)
        }
      )
    }
  }

  selectedItemAndStoreID(item: any){
    this.datatable[0].forEach((element: any) =>{
      if(element !== item){
        element.seleccionado = false
      } else {
        this.idSeleccionado = item.idApostador;
        this.selectedName = item.apostNombre;
        console.log('El metodo selectAndStoreID funciona, idApostador = ' + this.idSeleccionado + 'nombre del apostador ' + this.selectedName);
        
        const selectedItem = this.getSelectedItem(); // TODO, Falta el metodo.
        this.isDeleteDisabled = !selectedItem
      }
    });
  }

  selectItemAndStoreIDGrupo(item: any)
  {
    this.datatable[0].forEach((element: any) => {
      if(element !== item){
        element.seleccionado = false
      } else {
        this.idGrupoSeleccionado = item.idGruposAp
        this.selectedGroupName = item.gruposApDescripcion
        console.log('El metodo selectAndStoreIDGrupo funciona. idGrupo = ' + this.idGrupoSeleccionado + ' nombre del grupo '  + this.selectedGroupName)
        const selectedItem = this.getSelectedItem();
        this.isDeleteDisabled = !selectedItem
      }
    });
  }

  selectItem(item: any){
    this.datatable[0].forEach((element: any) => {
      if(element !== item){
        element.seleccionado = false;
      }
    });
  }

  getSelectedItem(): any{
    return this.datatable[0].find((item: any) => item.seleccionado);
  }

}
