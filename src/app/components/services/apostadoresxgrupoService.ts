import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { apostadoresxgrupoDTO } from "../cruds/models/apostadoresxgrupo/apostadoresxgrupo";

@Injectable({
    providedIn: 'root'
})
export class apostadersxgrupoService{
    constructor(private http: HttpClient){}

    url: string = 'https://localhost:7242/ApostadoresXGrupo'

    getApostadoresXGrupo(idGruposAp: number){
        let params = new HttpParams()
        .set('IDGruposAp', idGruposAp.toString())

        let urlParams = `${this.url}?${params.toString()}`;
        return this.http.get(urlParams);
    }
    
    deleteApostadoresXGrupo(idGrAp: number, idApost: number){
        const requestBody = {idGruposAp: idGrAp, idApostador: idApost};

        return this.http.delete(this.url, {body: requestBody});
    }

    postApostadoresXGrupo(bodyRequirements: apostadoresxgrupoDTO): Observable<apostadoresxgrupoDTO>{
        const requestBody ={
            idGruposAp: bodyRequirements.idGruposAp,
            idApostador: bodyRequirements.idApostador
        };
        return this.http.post<apostadoresxgrupoDTO>(this.url, requestBody);
    }

}