import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [{path:"", component:InicioComponent}, {path:"login", component:LoginComponent}];
