import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apostadoresDTO } from '../cruds/models/apostadoresdto';

@Injectable({
    providedIn: 'root'
  })
  export class apostadoresService {
  
    constructor(private http: HttpClient) { }
    
    url: string = 'https://localhost:7242/Apostadores'; // URL base para las solicitudes HTTP
  
    getApostadores(idApostador: number, apostadorNombre: string, apostadorMail: string) {
      let params = new HttpParams()
        .set('IDApostador', idApostador.toString()) // Agrega el parámetro ID con el valor convertido a cadena
        .set('AposNombre', apostadorNombre) // Agrega el parámetro Nombre con el valor proporcionado
        .set('ApostMail', apostadorMail); // Agrega el parametro Mail con el valor proporcionado

      let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
      return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
    }
  
    postApostadores(apostador: apostadoresDTO): Observable<apostadoresDTO> {
      const requestBody = { idApostador: apostador.apostadoresDTOid, aposNombre: apostador.apostadoresDTOnombre, apostMail: apostador.apostadoresDTOmail, aposPuntos: apostador.apostadoresDTOpuntos };
      return this.http.post<apostadoresDTO>(this.url, requestBody); // Realiza una solicitud POST a la URL con el objeto país en el cuerpo
    }
    
    putApostadores(id: number, apostador: apostadoresDTO): Observable<apostadoresDTO> {
      const requestBody = { idApostador: apostador.apostadoresDTOid, aposNombre: apostador.apostadoresDTOnombre, apostMail: apostador.apostadoresDTOmail, aposPuntos: apostador.apostadoresDTOpuntos};
      return this.http.put<apostadoresDTO>(this.url, requestBody);
    }
    
    deleteApostadores(id: number, apostadorNombre: string, apostadorMail: string, apostadorPuntos: number) {
    
      // Crea un objeto con el ID y el nombre del equipo
      const requestBody = { idApostador: id, aposNombre: apostadorNombre, apostMail: apostadorMail, aposPuntos: apostadorPuntos };
    
      // Agrega el objeto como cuerpo de la solicitud DELETE utilizando la opción 'body'
      return this.http.delete(this.url, { body: requestBody }); // Realiza una solicitud DELETE a la URL con el ID y el nombre del equipo en el cuerpo
    }
  }
  
  