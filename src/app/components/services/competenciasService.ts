import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { competenciasDTO } from '../cruds/models/competencias/competenciasdto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class competenciasService {
  
    constructor(private http: HttpClient) { }
    
    url: string = 'https://localhost:7242/Competencia'; // URL base para las solicitudes HTTP
  
    getCompetencia(idCompetencia: number, nombreCompetencia: string) {
      let params = new HttpParams()
        .set('IDCompetencia', idCompetencia.toString()) // Agrega el parámetro 'IDEquipo' con el valor convertido a cadena
        .set('CompetenciaNombre', nombreCompetencia); // Agrega el parámetro 'EquipoNombre' con el valor proporcionado
      let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
      return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
    }
  
    postCompetencia(competencia: competenciasDTO): Observable<competenciasDTO> {
      const requestBody = { idCompetencia: competencia.competenciasDTOid, competenciaNombre: competencia.competenciasDTOnombre };
      return this.http.post<competenciasDTO>(this.url, requestBody); // Realiza una solicitud POST a la URL con el objeto país en el cuerpo
    }
    
    putCompetencia(id: number, competencia: competenciasDTO): Observable<competenciasDTO> {
      const requestBody = { idCompetencia: competencia.competenciasDTOid, competenciaNombre: competencia.competenciasDTOnombre };
      return this.http.put<competenciasDTO>(this.url, requestBody);
    }
    
    deleteCompetencias(id: number, nombreCompetencia: string) {
    
      // Crea un objeto con el ID y el nombre del equipo
      const requestBody = { idCompetencia: id, competenciaNombre: nombreCompetencia };
    
      // Agrega el objeto como cuerpo de la solicitud DELETE utilizando la opción 'body'
      return this.http.delete(this.url, { body: requestBody }); // Realiza una solicitud DELETE a la URL con el ID y el nombre del equipo en el cuerpo
    }
  }
  
  