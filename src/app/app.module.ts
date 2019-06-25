import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClienteComponent } from './cliente/cliente.component';

import { AngularFireAuth  } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ProdutoComponent } from './produto/produto.component';

import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ClienteComponent,
    LoginComponent ,   
    ProdutoComponent  
  ],
  providers: [AuthGuard, AngularFireModule, AngularFireAuth, AngularFireStorage, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
