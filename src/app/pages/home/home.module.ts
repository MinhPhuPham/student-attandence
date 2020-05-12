import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { PopmenuComponent } from './../../components/popmenu/popmenu.component';

import {CheckStudentsComponent} from '../../components/check-students/check-students.component'
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PopmenuComponent,CheckStudentsComponent]
})
export class HomePageModule {}
