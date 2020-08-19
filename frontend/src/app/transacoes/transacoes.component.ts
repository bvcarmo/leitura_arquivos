import { Component, OnInit, OnChanges,SimpleChanges } from '@angular/core';
import { TransacoesService } from './transacoes.service';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit,OnChanges {

  constructor(private transacoesService: TransacoesService){}

  transacoes : any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.transacoes)
      this.transacoes = this.transacoes;
    }
  
  ngOnInit(): void {
    this.transacoesService.listarTransacoes().
    subscribe (transacoes =>{this.transacoes = transacoes})
  }

}
