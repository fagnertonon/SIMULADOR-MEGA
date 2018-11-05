import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormsModule}  from  '@angular/forms'
import { rootRouterConfig } from './app.routes'

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { ListaConcursosComponent } from './concursos/lista-concursos/lista-concursos.component';
import { ListaBilhetesComponent } from './billhetes/lista-bilhetes/lista-bilhetes.component';
import { BdService } from './services/bd.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    FooterComponent,
    MainPrincipalComponent,
    ListaConcursosComponent,
    ListaBilhetesComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, {
      useHash: false
    }),
    ReactiveFormsModule
  ],
  providers: [BdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
