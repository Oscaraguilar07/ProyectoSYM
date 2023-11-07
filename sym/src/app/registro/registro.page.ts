import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formData = {
    nombre: "",
    apellido: "",
    celular: "",
    direccion: "",
    correo: "",
    contrasena: ""
  }

  constructor() { }

  ngOnInit() {
  }

  create(){
    console.log(this.formData);
    axios.post("http://localhost/SyM/backend/usuarios.php", this.formData)
    .then(
      (response)=>{
        console.log(response);
      })
    .catch((error)=>{
      console.log(error);
    })
  }

}
