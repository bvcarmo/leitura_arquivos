import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = 'http://localhost:3500';

@Injectable({
    providedIn: "root"
})
export class ArquivosService {

    constructor (private http: HttpClient){}

    listarArquivos(){
        
        return this.http
        .get<any[]>(API +`/arquivos`)
    }


}