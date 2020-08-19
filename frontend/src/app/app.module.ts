import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';
import { TransacoesComponent } from './transacoes/transacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ArquivosComponent,
    EstatisticasComponent,
    TransacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
