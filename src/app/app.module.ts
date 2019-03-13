import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FirebaseServiceService } from 'src/app/firebase-service.service';
import { HomepageComponent } from './homepage/homepage.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NewitemComponent } from './newitem/newitem.component';
import { HistoryComponent } from './history/history.component';
import { SelectedDirective } from './selected.directive';
import { NavSelectedDirective } from './nav-selected.directive';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    MarketplaceComponent,
    NewitemComponent,
    HistoryComponent,
    SelectedDirective,
    NavSelectedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
 

  ],
  providers: [FirebaseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
