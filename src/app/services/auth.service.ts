import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  estadoLogueado(): boolean {
    return !!this.getToken();
  }

  Login(datosLogin: Login): Promise<boolean> {
    console.log("Intentando iniciar sesión con:", datosLogin);  
    return fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosLogin),
    })
    .then(r => r.json().then(data => {
      if (data.status === "ok") {
        localStorage.setItem('token', data.token);
        console.log("Token guardado en localStorage:", data.token); 
        return true;
      } else {
        return false;
      }
    }))
    .catch(error => {
      console.error("Error en la solicitud de login:", error); 
      return false;
    });
  }
}

 
