import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListStudentsHisPageRoutingModule } from './list-students-his-routing.module';

import { ListStudentsHisPage } from './list-students-his.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ListStudentsHisPageRoutingModule
  ],
  declarations: [ListStudentsHisPage]
})
export class ListStudentsHisPageModule {}
