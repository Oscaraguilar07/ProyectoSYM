import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  listProduc: any= []
  listProducAll: any= []

  nombre:string='';
  descrip_produc:string='';
  categoria:string='';
  unidadxcaja:string='';
  valor_produc:string='';
  imagen:string='';
  
  constructor(
    public router: Router
  ) {}

  ngOnInit() {
    debugger
        this.listProduc=localStorage.getItem('lista-produts');
        this.listProducAll = JSON.parse(this.listProduc);
        console.log(this.listProducAll)
    
      }
}
