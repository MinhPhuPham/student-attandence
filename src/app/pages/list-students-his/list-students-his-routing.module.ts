import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStudentsHisPage } from './list-students-his.page';

const routes: Routes = [
  {
    path: '',
    component: ListStudentsHisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListStudentsHisPageRoutingModule {}
