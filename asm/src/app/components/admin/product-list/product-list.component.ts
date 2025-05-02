import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = data as Product[];
    },error =>{
      console.log(error.message)
    });
  }

  onDelete(id:string){
    var result = confirm("Xóa 1 sản phẩm");
    if(result){
      this.productService.delete(id).subscribe(data =>{
        location.assign('/admin/product-list');
      });

    }
  }

}
