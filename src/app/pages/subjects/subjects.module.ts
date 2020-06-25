import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectsPageRoutingModule } from './subjects-routing.module';

import { SubjectsPage } from './subjects.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    SubjectsPageRoutingModule
  ],
  declarations: [SubjectsPage]
})
export class SubjectsPageModule {}
