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

  addItems(product:any){
    this.listaProductos.push(product);
    localStorage.setItem('lista-produts',JSON.stringify(this.listaProductos));
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