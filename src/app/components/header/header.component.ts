import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { RouterModule} from '@angular/router';  

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  esAdmin: boolean = false; 
  auth = inject(AuthService);
  resultadoInput: any;


abrirModal(){
  Swal.fire({
    title: 'Enter your IP address',
    input: 'text',
    inputLabel:'Your IP adress',
    inputValue: "",
    showCancelButton: true,

  }).then((result)=>{
    console.log(result);
    this.resultadoInput = result.value;
  });
}
}
