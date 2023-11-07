import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos : any = [];

  listaProductos: any[]=[];

  constructor(public http: HttpClient,public route: Router) {}

  //ngOnInit() {

    //this.http.get('../../assets/jsProductos/Productos.js').subscribe(data => {
      //this.listaProductos = JSON.parse(JSON.stringify(data))[0].detalleProductos; 

    //});
  //}

  ngOnInit(){

    this.http.get('http://localhost/databaseSyM/user.php').subscribe((response)=>{
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
