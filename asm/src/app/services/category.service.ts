import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = `http://127.0.0.1:8000/v1`;
  constructor(private httpClient: HttpClient) {}
// gọi api để lấy danh sách danh mục
  getAll() {
    return this.httpClient.get(`${this.url}/category`);
  }

  getCategoryDetail(id: string) {
    return this.httpClient.get(`${this.url}/category/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.url}/category/${id}`);
  } // gửi yêu cầu đến api để xoá danh mục có id tương ứng

  addCategory(body: any){ //Tham số body: any là dữ liệu của danh mục mà bạn muốn thêm
  return this.httpClient.post(`${this.url}/category`, body);
  } // khi ấn thêm Angular sẽ gửi dữ liệu đó API
  //  và server sẽ xử lý yêu cầu, sau đó lưu vào database.

  updateCategory(id: string, body: any){
    return this.httpClient.put(`${this.url}/category/${id}`, body);
  }

}
