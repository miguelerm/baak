import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponente } from './home.componente';

const routes: Routes = [
  { path: '', component: HomeComponente }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomeComponente
    ],
    exports: [
        RouterModule
    ]
})
export class HomeModulo {

}