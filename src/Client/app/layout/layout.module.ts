import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';

import { AppHeaderComponent } from './app-header.component';
import { MainSidebarComponent } from './main-sidebar.component'
import { AppFooterComponent } from './app-footer.component';
import { ControlSidebarComponent } from './control-sidebar.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ AppHeaderComponent, MainSidebarComponent, AppFooterComponent, ControlSidebarComponent ],
  exports: [ AppHeaderComponent, MainSidebarComponent, AppFooterComponent, ControlSidebarComponent ]
})
export class LayoutModule { }
