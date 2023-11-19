import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
apiUrl:string;
  constructor(private _http: HttpClient) {
    this.apiUrl = environment.newsPortalAPIUrl + 'Article'
  }

  addArticle(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  updateArticle(data: any): Observable<any> {
    return this._http.put(this.apiUrl, data);
  }

  getArticleList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  deleteArticle(id: number): Observable<any> {
    return this._http.delete(this.apiUrl+ `/${id}`);
  }
}