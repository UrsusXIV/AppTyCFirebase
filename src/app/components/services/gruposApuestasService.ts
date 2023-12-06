import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { gruposApuestasDTO } from "../cruds/models/gruposapuestas/gruposApuestas";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class gruposApuestasService {
    constructor(private http: HttpClient){ }

    url: string = 'https://localhost:7242/GruposApuestas';

    getGruposApuestas(idGruposAp: number)
    {
        let params = new HttpParams()
        .set('IDGruposAp', idGruposAp.toString())
        let urlParams = `${this.url}?${params.toString()}`;
        return this.http.get(urlParams);
    }

    postGruposApuestas(gruposAp: gruposApuestasDTO): Observable<gruposApuestasDTO>
    {
        const requestBody = {idGruposAp: gruposAp.idGruposAp, grupoApDescripcion: gruposAp.grupoApDescripcion};
        return this.http.post<gruposApuestasDTO>(this.url, requestBody);
    }

    putGruposApuestas(grupoAp: gruposApuestasDTO): Observable<gruposApuestasDTO>
    {
        const requestBody = {idGruposAp: grupoAp.idGruposAp, grupoApDescripcion: grupoAp.grupoApDescripcion };
        return this.http.put<gruposApuestasDTO>(this.url, requestBody)
    }

    deleteGruposApuestas(id: number)
    {
        const requestBody = {idGruposAp: id};
        return this.http.delete(this.url, { body: requestBody })
    }

}  