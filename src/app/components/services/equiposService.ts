import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { equiposDTO } from '../cruds/models/equipos/equiposdto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class equiposService {
  
    constructor(private http: HttpClient) { }
    
    url: string = 'https://localhost:7242/Equipos'; // URL base para las solicitudes HTTP
  
    getEquipos(idEquipo: number, nombreEquipo: string) {
      let params = new HttpParams()
        .set('IDEquipo', idEquipo.toString()) // Agrega el parámetro 'IDEquipo' con el valor convertido a cadena
        .set('EquipoNombre', nombreEquipo); // Agrega el parámetro 'EquipoNombre' con el valor proporcionado
      let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
      return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
    }
  
    postEquipos(equipo: equiposDTO): Observable<equiposDTO> {
      const requestBody = { idEquipo: equipo.equiposDTOid, equipoNombre: equipo.equiposDTOnombre };
      return this.http.post<equiposDTO>(this.url, requestBody); // Realiza una solicitud POST a la URL con el objeto país en el cuerpo
    }
    
    putEquipos(id: number, equipo: equiposDTO): Observable<equiposDTO> {
      const requestBody = { idEquipo: equipo.equiposDTOid, equipoNombre: equipo.equiposDTOnombre };
      return this.http.put<equiposDTO>(this.url, requestBody);
    }
    
    deleteEquipos(id: number, nombreEquipo: string) {
    
      // Crea un objeto con el ID y el nombre del equipo
      const requestBody = { idEquipo: id, equipoNombre: nombreEquipo };
    
      // Agrega el objeto como cuerpo de la solicitud DELETE utilizando la opción 'body'
      return this.http.delete(this.url, { body: requestBody }); // Realiza una solicitud DELETE a la URL con el ID y el nombre del equipo en el cuerpo
    }
  }
  
  