import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsHeader} from '../model/NewsHeader';
import {NewsCategory} from '../model/NewsCategory';
import {NewsDetail} from '../model/NewsDetail';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private url = 'https://dev.matrikswebtrader.com/homework/assets/dummy-service/';
  constructor(
    private http: HttpClient,
  ) { }

  getCategory() {
    return this.http.get<NewsCategory[]>(this.url + 'default.asp?type=newsCategory');
  }

  getHeader() {
    return this.http.get<NewsHeader[]>(this.url + 'default.asp?type=newsHeader');
  }

  getDetail(id) {
    return this.http.get<NewsDetail>(this.url + 'newsDetail.asp?id=' + id);
  }
}
