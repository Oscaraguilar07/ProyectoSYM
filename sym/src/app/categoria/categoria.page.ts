import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  productosPorCategoria: any[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    // Obtener la categoría de la URL
    this.activatedRoute.params.subscribe(params => {
      const categoria = params['categoria'];

      // Obtener los productos de la categoría desde el localStorage
      const productosCategoriaJSON = localStorage.getItem(`productos${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);
      this.productosPorCategoria = productosCategoriaJSON ? JSON.parse(productosCategoriaJSON) : [];
    });
  }

  ngOnInit() {
  }

}
