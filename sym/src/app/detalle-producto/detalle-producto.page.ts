import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  productos : any = [];

  detaProduc: any = []

  listaProductos: any[]=[];

  id: any = []
  cart: any = []
  
  nombre:string='';
  descrip_produc:string='';
  categoria:string='';
  unidadxcaja:string='';
  valor_produc:string='';
  imagen:string='';

  quantity: any = [] 
  price: any = [] 
  total: any = []


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    )
    {}

  ngOnInit() {

    this.detaProduc=localStorage.getItem('detalleProductos');
    this.detaProduc = JSON.parse(this.detaProduc);

 
    this.nombre=this.detaProduc.nombre;
    this.descrip_produc=this.detaProduc.descrip_produc;
    this.categoria=this.detaProduc.categoria;
    this.unidadxcaja=this.detaProduc.unidadxcaja;
    this.valor_produc=this.detaProduc.valor_produc;
    this.imagen=this.detaProduc.imagen;

    console.log("detalle producto", this.detaProduc)

    this.quantity=1
    this.price=this.valor_produc
    this.total=this.price

  }

  addItems() {
    // Obtener la lista de productos del localStorage
    const storedProducts = localStorage.getItem('lista-productos');
  
    // Parsear la lista de productos almacenados o inicializar un array vacío si no hay productos almacenados
    this.listaProductos = storedProducts ? JSON.parse(storedProducts) : [];
  
    // Buscar el producto en la lista por su nombre
    const productInList = this.listaProductos.find((p) => p.nombre === this.nombre);
  
    if (productInList) {
      // Si el producto ya está en la lista, aumenta la cantidad
      productInList.cantidad += 1;
    } else {
      // Si el producto no está en la lista, agrégalo con cantidad 1
      this.listaProductos.push({
        imagen: this.imagen,
        nombre: this.nombre,
        valor_produc: this.valor_produc,
        cantidad: 1
      });
    }
  
    // Actualizar el localStorage con la lista actualizada
    localStorage.setItem('lista-productos', JSON.stringify(this.listaProductos));
  
    // Actualizar la cantidad total en el localStorage
    this.actualizarCantidadTotal();
  }
  
  private actualizarCantidadTotal() {
    // Calcular la cantidad total sumando la cantidad de todos los productos
    const cantidadTotal = this.listaProductos.reduce((total, producto) => total + producto.cantidad, 0);
  
    // Guardar la cantidad total en el localStorage
    localStorage.setItem('cantidad-total', cantidadTotal.toString());
  }
  

  

  

  addItem(){
    if(this.quantity > 0){
      this.quantity +=1;
      this.total = this.price * this.quantity;
      console.log("quantityAdd",this.quantity)
      console.log("price",this.price)
    }
  }

  restItem(){
    if(this.quantity > 1){
      this.quantity -=1;
      this.total = this.price * this.quantity;
      console.log("quantityAdd",this.quantity)
    }
  }

}