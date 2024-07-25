import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { competenciasService } from 'src/app/components/services/competenciasService';
import { posicionesService } from 'src/app/components/services/posicionesServices';

@Component({
  selector: 'app-resultspage',
  templateUrl: './resultspage.component.html',
  styleUrls: ['./resultspage.component.css']
})
export class ResultspageComponent implements OnInit {

  comboComDatatable: any = [];
  Datatable: any = [];
  loadedCompetenciaId: number | null = null;
  idSeleccionadoComboCo: number | null = null;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private competenciaService: competenciasService, private posicionesService: posicionesService, private router: Router){}

  ngOnInit(): void{

    this.initComboCom();
  }

  initComboCom(){
    this.competenciaService.getCompetencia(0, "empty").subscribe(resComCombo => 
    {
      this.comboComDatatable = Object.values(resComCombo);
    })

    
  }

  onCompetenciaSelected(): void{
    if(this.loadedCompetenciaId !== null)
    {
      this.onDataTable()
    }
  }

  onDataTable(){
    if(this.loadedCompetenciaId !== null){
      this.idSeleccionadoComboCo = this.loadedCompetenciaId;
      this.posicionesService.getPosiciones(this.idSeleccionadoComboCo).subscribe(
        (resDataTable: any) =>{
          console.log(resDataTable);
          this.Datatable = Object.values(resDataTable);
          console.log(this.Datatable);
          this.calculatePagination()
        }
      )
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

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber

  }
}
