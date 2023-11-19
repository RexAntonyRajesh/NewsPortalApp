import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string ="https://localhost:7281/api/Category";
  
  constructor(private _http: HttpClient) {}

  getCategoryList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }
}
