import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListThemesPage } from './list-themes.page';

const routes: Routes = [
  {
    path: '',
    component: ListThemesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListThemesPageRoutingModule {}
