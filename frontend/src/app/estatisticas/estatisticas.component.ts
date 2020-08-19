import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EstatisticasService } from './estatisticas.service';
import { Estatisticas } from './estatisticas';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit,OnChanges {

  estatisticas : Estatisticas = {
    qtdArquivosRecepcionados: 0,
    qtdArquivosNaoRecepcionados: 0
  };
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Arquivos Recepcionados'], ['Arquivos Não Recepcionados']];
  public pieChartData: SingleDataSet = [100, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private estatisticasService: EstatisticasService){
    
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.estatisticas)
      this.estatisticas = this.estatisticas;
    }
  
  ngOnInit(): void {
    this.estatisticasService.listarEstatisticasArquivos().
    subscribe (estatisticas => {
      this.estatisticas = estatisticas;
      this.pieChartData = [estatisticas.qtdArquivosRecepcionados, estatisticas.qtdArquivosNaoRecepcionados];
    })
  }



}
