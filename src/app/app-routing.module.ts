import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSavedCardComponent } from './Components/manage-saved-card/manage-saved-card.component';

const routes: Routes = [
  {
    path: '',
    component: ManageSavedCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
