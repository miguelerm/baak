import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes }   from '@angular/router';

import { ConfigurationManager } from './configuration.manager'

import { AppComponent }  from './app.component';
import { PageNotFoundComponente } from './page-not-found.componente'

import { CoreModulo } from './core';
import { HomeModulo } from './home';
import { SeguridadModulo } from './seguridad';
import { LayoutModule } from './layout';

const appRoutes: Routes = [
  { path: '**', component: PageNotFoundComponente }
];

@NgModule({
  imports: [
    BrowserModule,
    CoreModulo,
    LayoutModule,
    HomeModulo,
    SeguridadModulo,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [ AppComponent, PageNotFoundComponente ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: ConfigurationManager, useFactory: () => window['__configurationManager'] }
  ]
})
export class AppModule { }
