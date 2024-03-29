import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router : Router
  ) { }

  ngOnInit() {
debugger
    this.listProduc=localStorage.getItem('lista-produts');
    this.listProducAll = JSON.parse(this.listProduc);
    console.log(this.listProducAll)

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