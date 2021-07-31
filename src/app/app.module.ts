import { CreditCardDirective } from './Shared/Directive/card.directive';
import { MaskCardPipe } from './Shared/Pipes/mask-card.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageSavedCardComponent } from './Components/manage-saved-card/manage-saved-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddCardComponent } from './Components/add-card/add-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RemoveCardComponent } from './Components/remove-card/remove-card.component';
@NgModule({
  declarations: [AppComponent, ManageSavedCardComponent, MaskCardPipe, AddCardComponent, CreditCardDirective, RemoveCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
