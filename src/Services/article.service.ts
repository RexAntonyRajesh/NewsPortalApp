import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
apiUrl:string ="https://localhost:7281/api/Article"
  constructor(private _http: HttpClient) {}

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