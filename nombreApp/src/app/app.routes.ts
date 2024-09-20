import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ContratarComponent } from './contratar/contratar.component';
import { PagoComponent } from './pago/pago.component';

export const routes: Routes = [{path:"", component:InicioComponent}, {path:"login", component:LoginComponent}, {path:"contratar", component:ContratarComponent},
    {path: 'pago', component: PagoComponent},
];
