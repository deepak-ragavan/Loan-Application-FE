import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor( private http: HttpClient) { }

  tableList() {
    return this.http.get(`http://localhost:8080/getLoanByFilterData`, {});
  }
  getFilter(data: any) {
    return this.http.get(`http://localhost:8080/getLoanByFilterData`, {params:data});
  }

  sendLink(data: Number[]){
   let obj = {
    loanIds: data
   }
    return this.http.post(`http://localhost:8080/sendLink`, obj);
  }
}
