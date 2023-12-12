import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
alertInputs: any;

presentAlert() {
throw new Error('Method not implemented.');
}

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
  alertButtons: any;

  constructor(
    public http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private alertController: AlertController
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
    this.subtotal = this.price * product.cantidad;
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

    if (index >= 0 && index < this.listProducAll.length) {

      this.listProducAll.splice(index, 1);

      localStorage.setItem('lista-productos', JSON.stringify(this.listProducAll));

      this.actualizarCantidadTotal();
    }
  }

  formatearMoneda(valor: number): string {
    return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    });
  }


  private calcularTotalProductos(): number {
    return this.listProducAll.reduce((total: any, producto: { subtotal: any; }) => total + producto.subtotal, 0);
  }

  private actualizarCantidadTotal() {
    this.total = this.calcularTotalProductos();
  
    const totalFormateado = this.formatearMoneda(this.total);
    localStorage.setItem('cantidad-total', totalFormateado);
  }

  updateLocalStorage() {
    console.log('Antes de actualizar localStorage:', this.listProducAll);

    console.log('Después de actualizar localStorage:', this.listProducAll);
    this.actualizarCantidadTotal();
  }

  validarCorreoElectronico(email: string): boolean {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  async mostrarAlertaExitosa() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Gracias por su pedido.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarAlertaError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Faltan campos obligatorios. Por favor, completa todos los campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Informacion del comprador',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre completo',
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo electrónico',
        },
        {
          name: 'direccion',
          type: 'text',
          placeholder: 'Dirección',
        },
        {
          name: 'celular',
          type: 'tel', // Usa el tipo 'tel' para campos de número de teléfono
          placeholder: 'Número de celular',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (this.camposValidos(data)) {
              console.log('Información ingresada:', data);

              if (this.validarCorreoElectronico(data.email)) {

              // Llama a tu función enviarCorreo y pasa la información ingresada
              this.enviarCorreo(data.nombre, data.email, data.direccion, data.celular);

              // Llama a tu función enviarCorreo con el contenido predeterminado
              const correoPredeterminado = 'Distrubucionessym@gmail.com';
              this.enviarCorreo(correoPredeterminado, 'Se realizo una venta', '', '');
              this.mostrarAlertaExitosa();

            } else {
              // Muestra la alerta de error si el correo electrónico no es válido
              this.mostrarAlertaErrorCorreo();
            }
            
            } else {
              console.log('Faltan campos obligatorios');
              // Puedes mostrar un mensaje al usuario indicando que faltan campos obligatorios
              this.mostrarAlertaError();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  private camposValidos(data: any): boolean {
    // Verificar que todos los campos obligatorios estén llenos
    return !!data.nombre && !!data.email && !!data.direccion && !!data.celular;
  }

  async mostrarAlertaErrorCorreo() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El formato del correo electrónico no es válido.',
      buttons: ['OK'],
    });
  
    await alert.present();
  }

  enviarCorreo(nombre: string, email: string, direccion: string, celular: string) {
    const url = 'http://localhost:3000/envio';
  
    // Obtener el subtotal como número antes de enviar el correo
    const subtotalNumerico = this.calcularSubtotalNumerico();
  
    const body = {
      asunto: 'Detalles de la compra',
      email: email,
      mensaje: `¡Hola ${nombre}! Gracias por hacer su pedido con nosotros. Estamos emocionados de enviarle nuestros productos de alta calidad. Si tiene alguna pregunta, no dude en preguntar.
      \nDirección: ${direccion}
      \nNúmero de celular: ${celular}
      \n\nDetalles de la compra:
      \n\n${this.generarDetallesProductos()}
      \n\nTotal de la compra: ${this.formatearMoneda(subtotalNumerico)}`,
    };
  
    this.http.post(url, body).subscribe(
      (response) => {
        console.log('Correo enviado exitosamente', response);
      },
      (error) => {
        console.error('Error al enviar el correo', error);
      }
    );
  }
  
  calcularSubtotalNumerico(): number {
    // Calcular el subtotal como número sin formato
    return this.listProducAll.reduce((subtotal: number, producto: { valor_produc: number; cantidad: number; }) => {
      const productoSubtotal = producto.valor_produc * producto.cantidad;
      return subtotal + productoSubtotal;
    }, 0);
  }

  
  generarDetallesProductos(): string {
    return this.listProducAll.map((producto: { nombre: any; cantidad: number; valor_produc: number; }) => 
      `${producto.nombre}: ${producto.cantidad} x ${this.formatearMoneda(producto.valor_produc)} (Subtotal: ${this.formatearMoneda(producto.valor_produc * producto.cantidad)})`
    ).join('\n');
  }
  
}
