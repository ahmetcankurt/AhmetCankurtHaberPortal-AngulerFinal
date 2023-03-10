import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { UyelerComponent } from './components/Uyeler/Uyeler.component';
import { KategorilerComponent } from './components/Kategoriler/Kategoriler.component';
import { HttpClientModule } from '@angular/common/http';
import { HaberlerComponent } from './components/Haberler/Haberler.component';
import { HomeComponent } from './components/Home/Home.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfilComponent,
    UyelerComponent,
    KategorilerComponent,
    HaberlerComponent,
    HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
