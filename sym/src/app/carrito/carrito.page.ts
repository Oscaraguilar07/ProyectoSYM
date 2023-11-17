import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listProduc: any= []
  listProducAll: any= []

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
    private router : Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.listProduc=localStorage.getItem('lista-produts');
    this.listProducAll = JSON.parse(this.listProduc);
    console.log(this.listProducAll)

    this.nombre=this.listProduc.nombre;
    this.descrip_produc=this.listProduc.descrip_produc;
    this.categoria=this.listProduc.categoria;
    this.unidadxcaja=this.listProduc.unidadxcaja;
    this.valor_produc=this.listProduc.valor_produc;
    this.imagen=this.listProduc.imagen;

    console.log("detalle producto", this.listProduc)


    this.quantity=1
    this.price=this.valor_produc
    this.total=this.price

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