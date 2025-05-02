import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, CommonModule],
})
export class HomeComponent implements OnInit {
  title = 'HomePage';
  products!: Product[];
  constructor(private ProductService: ProductService) {}

  ngOnInit() {
    this.ProductService.getAll().subscribe((data) => {
      this.products = data as Product[];
      console.log(this.products);
    });
  }

  getTitle() {
    return this.title;
  }
  helo() {
    alert(`${this.title}`);
  }
}
