import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Category } from '../../../model/category';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class ProductEditComponent implements OnInit {
  id!: string;
  product!: Product
  productForm!: FormGroup;
  categories!: Category[];
  constructor(private categoryService: CategoryService,private productService: ProductService,private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];

    this.productService.getProductDetail(this.id).subscribe(data => {
      this.product = data as Product;

      this.categoryService.getAll().subscribe((data) => {
        this.categories = data as Category[];
      });
      this.productForm = new FormGroup({
        name: new FormControl(this.product.name, [Validators.required, Validators.minLength(6)]),
        desc: new FormControl(this.product.desc, [Validators.required]),
        category: new FormControl(this.product.category, [Validators.required]),
        image: new FormControl(this.product.image, [Validators.required]),
        price: new FormControl(this.product.price, [Validators.required]),
      });
    })
  }
  ngOnInit() { }

  OnAdd() {
    if (this.productForm.invalid) {
      alert('du lieu khong hop le');
    } else {
      this.productService.updateProduct(this.id, this.productForm.value).subscribe(
        (data) => {
          location.assign('/admin/product-list');
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
