import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  loading = true;
  productos: Producto[] = []; 
  productosFiltrado: Producto[] = [];
  constructor(private http: HttpClient) { 
    this.loadProductos();
  }
  private loadProductos(){
    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-html-2cca0.firebaseio.com/Productos_idx.json').subscribe((resp:Producto[])=>{
        this.productos=resp;
        this.loading = false;
      });
    })
  }
  getProducto(id:string){
    return this.http.get(`https://angular-html-2cca0.firebaseio.com/Productos/${ id }.json`);
  }

  searchProduct(term: string){
    if(this.productos.length === 0){this.loadProductos().then(()=>{

    })}
    else{
      this.filtrarProductos(term);
    }
  }

  private filtrarProductos(term:string){
    this.productosFiltrado = [];
    term = term.toLowerCase();
    this.productos.forEach(product => {
      const titulo = product.titulo.toLowerCase();
      if(product.categoria.indexOf(term) >= 0 || titulo.indexOf(term) >= 0){

        this.productosFiltrado.push(product);
      }
    });
  }  
}
