import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  loading = true;
  productos: Producto[] = []; 
  constructor(private http: HttpClient) { 
    this.loadProductos();
  }
  private loadProductos(){
    this.http.get('https://angular-html-2cca0.firebaseio.com/Productos_idx.json').subscribe((resp:Producto[])=>{
      this.productos=resp;
      this.loading = false;
    });
  }
}
