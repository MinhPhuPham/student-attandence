import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RootLayoutPageRoutingModule } from './root-layout-routing.module';

import { RootLayoutPage } from './root-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RootLayoutPageRoutingModule
  ],
  declarations: [RootLayoutPage]
})
export class RootLayoutPageModule {}
