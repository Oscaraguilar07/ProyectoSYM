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

  categorias: string[] = ['Detalle']; // Agrega las categorías que necesitas

  productosPorCategoria: { [key: string]: any[] } = {};

  listaProductos: any[] = []; 
  
  productos: any;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(
    public http: HttpClient,
    public route: Router

  ) { }

  ngOnInit() {
    this.categorias.forEach(categoria => {
      this.obtenerProductosPorCategoria(categoria);
    });
  }

  obtenerProductosPorCategoria(categoria: string) {
    this.http.get<any[]>(`http://localhost/SyM/backend/productos.php`).subscribe((response) => {
      console.log(response);

      // Filtrar productos por la categoría deseada
      const productosCategoria = response.filter(producto => producto.categoria === categoria);

      // Guardar productos en el objeto productosPorCategoria
      this.productosPorCategoria[categoria] = productosCategoria;
    });
  }

  Navigate(value:any){

    this.route.navigate(['detalle-producto'])
    localStorage.setItem('detalleProductos', JSON.stringify(value))
    
  }

  addItems(product: any) {
    const storedProducts = localStorage.getItem('lista-productos');

    this.listaProductos = storedProducts ? JSON.parse(storedProducts) : [];

    const productInList = this.listaProductos.find((p) => p.id === product.id);
  
    if (productInList) {
      productInList.cantidad += 1;
    } else {
      this.listaProductos.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem('lista-productos', JSON.stringify(this.listaProductos));
  
    this.actualizarCantidadTotal();
  }

    private actualizarCantidadTotal() {
    const cantidadTotal = this.listaProductos.reduce((total, producto) => total + producto.cantidad, 0);
    localStorage.setItem('cantidad-total', cantidadTotal.toString());
  }
  
  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }


  swiperSlideChanged(e: any){
    console.log('changed: ', e)
  }

}
