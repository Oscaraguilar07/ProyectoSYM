import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  detainfo : any[]=[];

  constructor(
    public http: HttpClient,
    public route: Router
  ) { }

  ngOnInit() {

    this.http.get('../../assets/informacion/informacion.json').subscribe(data => {
      this.detainfo = JSON.parse(JSON.stringify(data))[0].informacion;
      
    });
  }

}
