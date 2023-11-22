import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  obtenerProductos() {
    throw new Error('Method not implemented.');
    }
    
      productos: any = [];
      listaProductos: any[] = [];
    
      constructor(
        public http: HttpClient,
        public route: Router
      ) {}
    
      ngOnInit(){
    
        this.http.get('http://localhost/SyM/backend/productos.php').subscribe((response)=>{
          console.log(response);
          this.productos = response;
        });
      }
    
      obtenerProductosPorCategoria(categoria: string) {
        this.http.get('http://localhost/SyM/backend/productos.php').subscribe((response) => {
          console.log(response);
          this.productos = response;
    
          // Filtrar productos por la categoría seleccionada
          const productosCategoria = this.productos.filter((producto: { categoria: string; }) => producto.categoria === categoria);
    
          // Convertir la lista de productos de la categoría a una cadena JSON
          const productosCategoriaJSON = JSON.stringify(productosCategoria);
    
          // Almacenar en LocalStorage
          localStorage.setItem(`productos${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`, productosCategoriaJSON);
        });
      }
    
      Navigate(value: any) {
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
    
    }
    