import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './views/login/login.component';
import { InscreverComponent } from './views/inscrever/inscrever.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MaterialModule } from './material/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LivrosComponent } from './views/livros/livros.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscreverComponent,
    HomeComponent,
    HeaderComponent,
    LivrosComponent,
    DashboardComponent,
    NovoEmprestimoComponent,
    EditarEmprestimoComponent,
    DetalhesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    AngularFireAuthModule,
    MaterialModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
