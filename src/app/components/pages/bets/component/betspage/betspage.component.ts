import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apuestasService } from 'src/app/components/services/apuestasService';
import { getapuestasdto } from 'src/app/components/cruds/models/apuestas/getapuestasdto';
import { postapuestasdto } from 'src/app/components/cruds/models/apuestas/postapuestasdto';
import { putapuestasdto } from 'src/app/components/cruds/models/apuestas/putapuestasdto';
import { competenciasService } from 'src/app/components/services/competenciasService';

@Component({
  selector: 'app-betspage',
  templateUrl: './betspage.component.html',
  styleUrls: ['./betspage.component.css']
})
export class BetspageComponent implements OnInit 
{
  idSeleccionadoComboCo: number | null = null;
  idPartidoSeleccionado: number | null = null;
  arrayEstadoPartido: string[] = ["No Iniciado", "Iniciado", "Finalizado"];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  Datatable: any = [];
  comboComDatatable: any = [];
  loadedCompetenciaId: number | null = null;
  isPostDisabled: boolean = true;
  isPutDisabled: boolean = true
  golesL: number = 0;
  golesV: number = 0;
  estadoPartido: number = 0;
  testApostadorID: number = 2;

  constructor
  (private apuestasService: apuestasService, private competenciasService: competenciasService, private Router: Router){}
    
  ngOnInit(): void 
  {
    this.initComboCom()
  }

  initComboCom(){
    this.competenciasService.getCompetencia(0, "empty").subscribe(resComCombo => 
    {
      this.comboComDatatable = Object.values(resComCombo);
    })

    
  }

  onDataTable()
  {
    if(this.loadedCompetenciaId !== null)
    {
      this.idSeleccionadoComboCo = this.loadedCompetenciaId;
      this.apuestasService.getApuestas(this.testApostadorID, this.idSeleccionadoComboCo).subscribe(
        (resDatatable: any) =>{
          console.log(resDatatable);
          this.Datatable = Object.values(resDatatable);
          console.log(this.Datatable);
          if(Array.isArray(this.Datatable[0]) && this.Datatable[0].length > 0)
          {
            this.Datatable[0].forEach((element: any) => {
              if (element.tieneApuesta === false) 
              {
                const postBody: postapuestasdto = 
                {
                  ApIDApostador: 2, // Hardcodeado, de momento

                  ApIDPartido: element.apIDPartido,
      
                  ApIDCompetencia: element.apIDCompetencia,

                  ApGolesL: 0,
      
                  ApGolesV: 0,
      
                  ApPuntosObtenidos: 0 // Hardcodeado, error de diseño.
                }
                this.apuestasService.postApuestas(postBody).subscribe(
                  (response) =>
                  {
                    console.log('POST EXITOSO ' + response)
                    if(response){
                      this.onDataTable();
                    }
                  },
                  (errorPost) =>
                  {
                    console.log('Se ha presentado un error. ' + errorPost)
                  }
                )
              }
            });
          }
        }
      )
      
    }
  }

  onCompetenciaSelected(): void{
    if(this.loadedCompetenciaId !== null)
    {
      this.onDataTable()
    }
  }

  postAndClear()
  {
    if(this.loadedCompetenciaId == null || this.idPartidoSeleccionado == null )
    {
      alert("No se ha seleccionado un dato requerido.")
    }

    else
    {
      if(this.loadedCompetenciaId !== null || this.idPartidoSeleccionado !== null)
      {
        const postApuestas: postapuestasdto =
        {
          ApIDApostador: this.testApostadorID, // Hardcodeado, de momento

          ApIDPartido: this.idPartidoSeleccionado,
      
          ApIDCompetencia: this.loadedCompetenciaId,
      
          ApGolesL: this.golesL,
      
          ApGolesV: this.golesV,
      
          ApPuntosObtenidos: 0 // Hardcodeado, error de diseño.
        }
        this.apuestasService.postApuestas(postApuestas).subscribe(
          (response) =>
          {
            console.log('POST EXITOSO ' + response)
            if(response){
              this.onDataTable();
            }
          },
          (errorPost) =>
          {
            console.log('Se ha presentado un error. ' + errorPost)
          }
        )
      }
    }
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
        this.idPartidoSeleccionado = item.apIDPartido;
        this.golesL = item.partGolesL;
        this.golesV = item.partGolesV;
        this.estadoPartido = item.partIDEstado;
        console.log("ID del partido almacenado es igual a " + this.idPartidoSeleccionado + " en sumatoria a sus parametros: " + this.golesL + " " +  this.golesV + " " + this.estadoPartido)
      }
    });
    if(this.idPartidoSeleccionado != null && this.estadoPartido === 1){
      this.isPutDisabled = false;
      this.isPostDisabled = true;
    }
    else
    {
      this.isPutDisabled = true;
    }
  }

  handleDeselection(item: any) {

    this.isPostDisabled = false;
    this.isPutDisabled = true;

    console.log('Checkbox deseleccionado', item);
  }

  onCheckboxChange(event: any, item: any) {
    if (event === false) {
      // El checkbox ha sido deseleccionado, realiza la lógica correspondiente aquí
      this.handleDeselection(item);
    } else {
      // El checkbox ha sido seleccionado, realiza la lógica correspondiente aquí
      this.selectItemAndStoreID(item);
    }
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber

  }

  updateGolesL(item: any){
    this.golesL = item.apGolesL;
    console.log("Goles del Local, actualizados.");
  }

  updateGolesV(item: any){
    this.golesV = item.apGolesV;
    console.log("Goles del visitante, actualizados.");
  }

  updateBet()
  {
    if(this.idPartidoSeleccionado == null || this.estadoPartido > 1)
    {
      alert("No se encuentra un partido seleccionado o el partido ya ha comenzado")
    }
    else
    {
      const putApuestas: putapuestasdto =
      {
        ApGolesL: this.golesL,

        ApGolesV: this.golesV,

        ApIDApostador: this.testApostadorID,

        ApIDPartido: this.idPartidoSeleccionado
      }
      this.apuestasService.putApuestas(putApuestas).subscribe(
        (responsePut) =>{
          console.log('PUT EXITOSO ' + responsePut)
          if(responsePut){
            this.onDataTable();
          }
        },
        (errorPut) => {console.log('Se ha presentado un error ' + errorPut)}
      )
    }
  }
}
