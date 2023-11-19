import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string;
  
  constructor(private _http: HttpClient) {
    this.apiUrl = environment.newsPortalAPIUrl + 'Category';
  }

  getCategoryList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }
}
