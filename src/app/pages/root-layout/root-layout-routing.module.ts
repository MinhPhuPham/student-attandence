import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootLayoutPage } from './root-layout.page';

const routes: Routes = [
  {
    path: '',
    component: RootLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootLayoutPageRoutingModule {}
