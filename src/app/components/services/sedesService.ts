import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sedesDTO } from '../cruds/models/sedes/sedesdto';

@Injectable({
    providedIn: 'root'
  })
  export class SedesService {
  
    constructor(private http: HttpClient) { }
    
    url: string = 'https://localhost:7242/Sede'; // URL base para las solicitudes HTTP
  
    getSedes(idSede: number, nombreSede: string) {
      let params = new HttpParams()
        .set('SedeID', idSede.toString()) // Agrega el parámetro 'IDSede' con el valor convertido a cadena
        .set('SedeNombre', nombreSede); // Agrega el parámetro 'SedeNombre' con el valor proporcionado
      let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
      return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
    }
  
    postSedess(sede: sedesDTO): Observable<sedesDTO> {
      const requestBody = { SedeID: sede.sedesDTOid, SedeNombre: sede.sedesDTOnombre };
      return this.http.post<sedesDTO>(this.url, requestBody); // Realiza una solicitud POST a la URL con el objeto en el cuerpo
    }
    
    putSedes(id: number, sede: sedesDTO): Observable<sedesDTO> {
      const requestBody = { SedeID: sede.sedesDTOid, SedeNombre: sede.sedesDTOnombre };
      return this.http.put<sedesDTO>(this.url, requestBody);
    }
    
    deleteSede(id: number, nombreSede: string) {
    
      // Crea un objeto con el ID y el nombre de sede
      const requestBody = { SedeID: id, SedeNombre: nombreSede };
    
      // Agrega el objeto como cuerpo de la solicitud DELETE utilizando la opción 'body'
      return this.http.delete(this.url, { body: requestBody }); // Realiza una solicitud DELETE a la URL con el ID y el nombre del equipo en el cuerpo
    }
  }
  
  