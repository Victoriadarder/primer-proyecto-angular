import { Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EstadoCocherasComponent } from './estado-cocheras/estado-cocheras.component';
import { AuthService } from '../app/services/auth.service';
import { inject } from '@angular/core';


function guardaLogueado(){
    let auth = inject(AuthService);
    let router = inject(Router);


    if(auth.estadoLogueado()){
        return true;
    } else {
    router.navigate(['/login']);
    return false;
}
}




export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        redirectTo:"login",
        pathMatch: 'full'
    },
    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent,
        canActivate: [guardaLogueado]
    },
];
 

