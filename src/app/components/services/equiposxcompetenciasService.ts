import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { equiposxcompetenciaDTO } from "../cruds/models/equiposxcompetencia/equiposxcompetenciadto";

@Injectable({
    providedIn: 'root'
})
export class equiposxcompetenciaService{
    
    constructor(private http: HttpClient){ }

    url: string = 'https://localhost:7242/EquiposXCompetencia'; // URL base para las solicitudes HTTP

    getEquiposXCompetencia(idEquipo: number, idCompetencia: number, equipoNombre: string, nombreCompetencia: string ){
        let params = new HttpParams()

        .set('IDEquipo', idEquipo.toString()) // Agrega el parametro ID con el valor convertido a cadena
        .set('IDCompetencia', idCompetencia.toString()) // Agrega el parametro ID con el valor convertido a cadena
        .set('EquipoNombre', equipoNombre)
        .set('NombreCompetencia', nombreCompetencia)

        let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
        return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
    }

    deleteEquiposXCompetencia(idE: number, idC: number){ //idE = idEquipo, idC = idCompetencia.

        const requestBody = {IDEquipos: idE, IDCompetencia: idC};

        return this.http.delete(this.url, { body: requestBody });
    }

    postEquiposXCompetencia(idRequireds: equiposxcompetenciaDTO): Observable<equiposxcompetenciaDTO>{
        const requestBody =
        {
            IDEquipo: idRequireds.idEquipoDTO, IDCompetencia: idRequireds.idCompetenciaDTO           
        };

        return this.http.post<equiposxcompetenciaDTO>(this.url, requestBody);
    }
}