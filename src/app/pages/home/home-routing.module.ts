import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {CheckStudentsComponent} from '../../components/check-students/check-students.component'
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

      {
        path: 'students',
        loadChildren: () => import('../../pages/students/students.module').then( m => m.StudentsPageModule),

      },

      {
        path: 'subjects',
        children:[
          {
            path:'',
            loadChildren: () => import('../../pages/subjects/subjects.module').then( m => m.SubjectsPageModule),
          },
          {
            path: 'classes/:subject_id',
            children:[
              {
                path:'',
                loadChildren: () => import('../../pages/class/class.module').then( m => m.ClassPageModule)
              },
              {
                path:'students/:class_id',
                component:CheckStudentsComponent
              }
            ]
            
          }
        ]
        
        
      },
      {path:'',
      redirectTo:'subjects',
      pathMatch: "full"
      }
    ]
  },
  {
    path: '',
    redirectTo: 'subjects',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
