import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [RouterModule, CommonModule]
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.productService.getProductByQuery(params).subscribe(data => {
          this.products = data as Product[];
        });
      });
  }

}
