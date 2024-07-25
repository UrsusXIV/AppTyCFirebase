import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { Observable } from "rxjs";
import { posicionesDTO } from "../cruds/models/posiciones/posicionesDTO";

@Injectable({
    providedIn: 'root'
  })

  export class posicionesService {
    constructor(private http: HttpClient){}

    url: string = 'https://localhost:7242/Posiciones'

    getPosiciones(apIDCompetencia: number){
        let params = new HttpParams()
        .set('posIDCompetencia', apIDCompetencia.toString())
        let urlParams = `${this.url}?${params.toString()}`;
        return this.http.get(urlParams)
    }
  }