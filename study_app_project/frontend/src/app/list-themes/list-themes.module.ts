import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ListThemesPage } from './list-themes.page';
import { ListThemesPageRoutingModule } from './list-themes-routing.module';
import { MessageComponentModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    ListThemesPageRoutingModule
  ],
  declarations: [ListThemesPage]
})
export class ListThemesPageModule {}
