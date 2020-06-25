import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootLayoutPage } from './root-layout.page';

const routes: Routes = [
  {
    path: '',
    component: RootLayoutPage,
    children:[
      { path: '' , redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../../pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'image',
        loadChildren: () => import('../../pages/modal/image/image.module').then( m => m.ImagePageModule)
      },
      {
        path: 'search-filter',
        loadChildren: () => import('../../pages/modal/search-filter/search-filter.module').then( m => m.SearchFilterPageModule)
      },
      {
        path: 'class',
        loadChildren: () => import('../../pages/class/class.module').then( m => m.ClassPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootLayoutPageRoutingModule {}
