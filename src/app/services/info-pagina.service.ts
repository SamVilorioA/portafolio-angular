import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  loaded = false;
  skills: any[] = []; 

  constructor(private http: HttpClient) {
    this.loadInfo();
    this.loadSkills();
   }

   private loadInfo(){
    this.http.get('assets/data/data-pagina.json').subscribe( (resp: InfoPagina)=>{
      this.loaded = true;
      this.info = resp;
    });
   }

   private loadSkills(){
     this.http.get('https://angular-html-2cca0.firebaseio.com/Skills.json').subscribe( (resp:any)=>{
       this.skills = resp;
     });
   }
}
