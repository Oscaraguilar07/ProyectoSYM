import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias: string[] = ['Detalle','chocolate', 'galletas', 'gomita']; // Agrega las categorías que necesitas

  productosPorCategoria: { [key: string]: any[] } = {};

  listaProductos: any[] = []; 
  
  productos: any;

  constructor(
    public http: HttpClient,
    public route: Router
  ) {}

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
