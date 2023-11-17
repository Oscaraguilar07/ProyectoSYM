import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  productos : any = [];

  listaProductos: any[]=[];

  constructor(
    public http: HttpClient,
    public route: Router
  ){}

  ngOnInit(){

    this.http.get('http://localhost/SyM/backend/productos.php').subscribe((response)=>{
      console.log(response);
      this.productos = response;
    });

    
  }

  Navigate(value:any){

    this.route.navigate(['detalle-producto'])
    localStorage.setItem('detalleProductos', JSON.stringify(value))
    
  }

  addItems(product:any){
    this.listaProductos.push(product);
    localStorage.setItem('lista-produts',JSON.stringify(this.listaProductos));
  }

}




