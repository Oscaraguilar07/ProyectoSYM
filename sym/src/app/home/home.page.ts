import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaProductos: any[]=[];

  productos : any = [];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(
    public http: HttpClient,
    public route: Router

  ) { }

  ngOnInit() {

    this.http.get('../../assets/jsProductos/Productos.js').subscribe(data => {
      this.listaProductos = JSON.parse(JSON.stringify(data))[0].detalleProductos; 

    });

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



  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }


  swiperSlideChanged(e: any){
    console.log('changed: ', e)
  }



  

  
  
  

}
