import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import { TransacoesComponent } from './transacoes/transacoes.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';


const routes : Routes = [
    {
        path: '',
        component: TransacoesComponent
    },
    {
        path: 'arquivos',
        component: ArquivosComponent
    },
    {
        path: 'graficos', 
        component: EstatisticasComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}