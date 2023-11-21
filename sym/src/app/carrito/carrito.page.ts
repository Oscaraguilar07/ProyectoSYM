import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listProduc: any;
  listProducAll: any;

  nombre: string = '';
  descrip_produc: string = '';
  categoria: string = '';
  unidadxcaja: string = '';
  valor_produc: string = '';
  imagen: string = '';

  quantity: number = 1;
  price: number = 0;
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listProduc = localStorage.getItem('lista-productos');
    this.listProducAll = JSON.parse(this.listProduc);

    console.log('Lista de productos:', this.listProducAll);

    if (this.listProducAll && this.listProducAll.length > 0) {
      const firstProduct = this.listProducAll[0];
      this.updateProductDetails(firstProduct);
    }
  }

  updateProductDetails(product: any) {
    this.nombre = product.nombre;
    this.descrip_produc = product.descrip_produc;
    this.categoria = product.categoria;
    this.unidadxcaja = product.unidadxcaja;
    this.valor_produc = product.valor_produc;
    this.imagen = product.imagen;
  
    this.price = parseFloat(this.valor_produc);
    this.subtotal = this.price * product.cantidad;  // Usa la cantidad del producto
  }

  addItem(product: any) {
    console.log('Aumentar cantidad', product);
    product.cantidad += 1;
    product.subtotal = product.valor_produc * product.cantidad;
    console.log('Después de aumentar:', product);
    this.updateLocalStorage();
  }

  restItem(product: any) {
    console.log('Reducir cantidad', product);
    if (product.cantidad > 1) {
      product.cantidad -= 1;
      product.subtotal = product.valor_produc * product.cantidad;
    }
    console.log('Después de reducir:', product);
    this.updateLocalStorage();
  }

  eliminarProducto(index: number) {
    // Verifica si el índice está dentro del rango de la lista
    if (index >= 0 && index < this.listProducAll.length) {
      // Elimina el producto de la lista
      this.listProducAll.splice(index, 1);
      
      // Actualiza el localStorage con la lista actualizada
      localStorage.setItem('lista-productos', JSON.stringify(this.listProducAll));
  
      // Actualiza el total después de eliminar el producto
      this.actualizarCantidadTotal();
    }
  }

  updateLocalStorage() {
    console.log('Antes de actualizar localStorage:', this.listProducAll);
    // ... (resto del código)
    console.log('Después de actualizar localStorage:', this.listProducAll);
    this.actualizarCantidadTotal();
  }

  private actualizarCantidadTotal() {
    // Calcular el total sumando los subtotales de todos los productos
    this.total = this.calcularTotalProductos();
  
    // Actualizar el localStorage con el nuevo total
    localStorage.setItem('cantidad-total', this.total.toString());
  }

  private calcularTotalProductos(): number {
    // Sumar todos los subtotales de los productos
    return this.listProducAll.reduce((total: any, producto: { subtotal: any; }) => total + producto.subtotal, 0);
  }
}
