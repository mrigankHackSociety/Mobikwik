import { ContentTypeInterceptor } from './Interceptor/content-type.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageSavedCardComponent } from './Components/manage-saved-card/manage-saved-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddCardComponent } from './Components/add-card/add-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RemoveCardComponent } from './Components/remove-card/remove-card.component';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './Shared/shared.module';
import { ResourceNotFoundComponent } from './Components/resource-not-found/resource-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    ManageSavedCardComponent,
    AddCardComponent,
    RemoveCardComponent,
    ResourceNotFoundComponent,
  ],
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
    FontAwesomeModule,
    MatSnackBarModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
