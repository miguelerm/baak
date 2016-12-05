import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}</h1>
  <a routerLink="/">Home</a>
  <a routerLink="/seguridad/usuarios">Usuarios</a>
  <router-outlet></router-outlet>
  `
})
export class AppComponent  { name = 'Angular'; }
