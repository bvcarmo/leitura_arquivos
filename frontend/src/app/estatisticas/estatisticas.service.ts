import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estatisticas } from './estatisticas';


const API = 'http://localhost:3500';

@Injectable({
    providedIn: "root"
})
export class EstatisticasService {

    constructor (private http: HttpClient){}

    listarEstatisticasArquivos(){
        
        return this.http
        .get<Estatisticas>(API +`/arquivos/estatistica`)
    }


}