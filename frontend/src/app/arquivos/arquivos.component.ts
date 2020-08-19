import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ArquivosService } from './arquivos.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit,OnChanges {

  constructor(private arquivosService: ArquivosService){}

  arquivos : any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.arquivos)
      this.arquivos = this.arquivos;
    }
  
  ngOnInit(): void {
    this.arquivosService.listarArquivos().
    subscribe (arquivos =>{this.arquivos = arquivos})
  }

}
