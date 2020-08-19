import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = 'http://localhost:3500';

@Injectable({
    providedIn: "root"
})
export class TransacoesService {

    constructor (private http: HttpClient){}

    listarTransacoes(){
        
        return this.http
        .get<any[]>(API +`/transacoes`)
    }


}