import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { postPartidosGrupoDTO } from "../cruds/models/partidosgrupo/postpartidosgrupodto";
import { putPartidosGrupoDTO } from "../cruds/models/partidosgrupo/putpartidosgrupodto";

@Injectable({providedIn: 'root'})

export class partidosGruposService{

    constructor(private http: HttpClient){}
    url: string = 'https://localhost:7242/PartidosGrupo' // URL Base

    getPartidosGrupo(idPartido: number, idCompetencia: number, partGrupoString: string)
    {
        let params = new HttpParams()
        .set('PartIDPartido', idPartido.toString())
        .set('PartIDCompetencia', idCompetencia.toString())
        .set('PartGrupo', partGrupoString)
        let urlParams = `${this.url}?${params.toString()}`;
        return this.http.get(urlParams)
    }

    postPartidosGrupo(postBody: postPartidosGrupoDTO): Observable<postPartidosGrupoDTO>
    {
        const requestedParams=
        {
            // partIDPartido: postBody.PartIDPartido,

            partIDCompetencia: postBody.PartIDCompetencia,

            partGrupo: postBody.PartGrupo,

            partIDEquipoL: postBody.PartIDEquipoL,

            partIDEquipoV: postBody.PartIDEquipoV,

            partIDSede: postBody.PartIDSede,

            partFechaDate: postBody.PartFechaDate,

            partHoraTime: postBody.PartHoraTime,

            partIDEstado: postBody.PartIDEstado,

            partGolesL: postBody.PartGolesL,

            partGolesV: postBody.PartGolesV,

            partPuntosL: postBody.PartPuntosL ,

            partPuntosV: postBody.PartPuntosV = 0
        };

        return this.http.post<postPartidosGrupoDTO>(this.url, requestedParams);
    }

    putPartidosGrupo(partido: putPartidosGrupoDTO): Observable<putPartidosGrupoDTO>{
        const requestBody = 
        {
            partIDPartido: partido.partIDPartido, 
            partIDEstado: partido.partIDEstado, 
            partGolesL: partido.partGolesL, 
            partGolesV: partido.partGolesV, 
        };
        return this.http.put<putPartidosGrupoDTO>(this.url, requestBody);
    }

    deletePartidosGrupo(idPartido: number)
    {
        const requestBody =
        {
            partIDPartido: idPartido
        }

        return this.http.delete(this.url, {body: requestBody});
    }

}

// Commit