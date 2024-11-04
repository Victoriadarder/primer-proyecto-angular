import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  datosLogin:Login = {
    username: 'admin',
    password: 'admin'
  }

  router = inject(Router); 

  auth = inject(AuthService);
  Login() {
    console.log("Login");
    this.auth.Login(this.datosLogin)
    .then(ok => {
      if (ok) {
        this.router.navigate(['/estado-cocheras']);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do i have this issue?</a>'
        });
      }
      }
    )

  }
}

 