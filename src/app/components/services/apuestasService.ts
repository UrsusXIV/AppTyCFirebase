import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { putapuestasdto } from "../cruds/models/apuestas/putapuestasdto";
import { postapuestasdto } from "../cruds/models/apuestas/postapuestasdto";
import { getapuestasdto } from "../cruds/models/apuestas/getapuestasdto";

@Injectable({
    providedIn: 'root'
})
export class apuestasService{
    constructor(private http: HttpClient){}

    url: string = 'https://localhost:7242/Apuestas'

    getApuestas(apIDApostador: number, apIDCompetencia: number)
    {
        let params = new HttpParams()
        .set('ApIDApostador', apIDApostador.toString())
        .set('ApIDCompetencia', apIDCompetencia.toString())
        let urlParams = `${this.url}?${params.toString()}`;
        return this.http.get(urlParams)
    }

    postApuestas(postBody: postapuestasdto): Observable<postapuestasdto>
    {
        const requestedParams={
           apIDPartido: postBody.ApIDPartido,
           apIDCompetencia: postBody.ApIDCompetencia,
           apIDApostador: postBody.ApIDApostador,
           apGolesL: postBody.ApGolesL,
           apGolesV: postBody.ApGolesV,
           apPuntosObtenidos: postBody.ApPuntosObtenidos = 0    
        };
        return this.http.post<postapuestasdto>(this.url, requestedParams);
    }

    putApuestas(putBody: putapuestasdto): Observable<putapuestasdto>{
        const requestedParams ={
            apGolesL: putBody.ApGolesL,
            apGolesV: putBody.ApGolesV,
            apIDPartido: putBody.ApIDPartido,
            apIDApostador: putBody.ApIDApostador
        };
        return this.http.put<putapuestasdto>(this.url, requestedParams);
    }
 
    // No posee delete, el usuario no puede borrar su apuesta.
}