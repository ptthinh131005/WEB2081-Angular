import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // getProductByQuery(params: Params) {
  //   throw new Error('Method not implemented.');
  // }
  url = `http://127.0.0.1:8000/v1`;
  constructor(private httpClient: HttpClient) { }
// goi api lấy toàn bộ danh sách sản phẩm
  getAll() {
    return this.httpClient.get(`${this.url}/product`);
  }

  getProductDetail(id: string) {
    return this.httpClient.get(`${this.url}/product/${id}`);
  }

  getProductByQuery(params: any) {
    console.log(params);
    let query = ``;
    if (params.category) {
      query = `category=${params.category}`;
    }
    if (params.keyword) {
      query = `keyword=${params.keyword}`;
    }
    return this.httpClient.get(`${this.url}/product?${query}`);
  }
  addProduct(body: any) {
    return this.httpClient.post(`${this.url}/product`, body);
  }
  updateProduct(id: string, body: any) {
    return this.httpClient.put(`${this.url}/product/${id}`, body);
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/product/${id}`);
  }

}
