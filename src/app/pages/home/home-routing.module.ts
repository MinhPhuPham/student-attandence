import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      
      {
        path: 'students',
        loadChildren: () => import('../../pages/students/students.module').then( m => m.StudentsPageModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('../../pages/subjects/subjects.module').then( m => m.SubjectsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
