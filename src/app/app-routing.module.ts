import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { KategorilerComponent } from './components/Kategoriler/Kategoriler.component';
import { UyelerComponent } from './components/Uyeler/Uyeler.component';
import { HaberlerComponent } from './components/Haberler/Haberler.component';
import { HomeComponent } from './components/Home/Home.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'haberler',
    component: HaberlerComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'kategoriler',
    component: KategorilerComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'uyeler',
    component: UyelerComponent,
    ...canActivate(redirectToLogin),
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
