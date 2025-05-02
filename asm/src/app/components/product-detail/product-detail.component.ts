import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone:true,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
   imports: [RouterModule,CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!:string;
  constructor(private ProductService: ProductService, private route: ActivatedRoute) {
  this.id = route.snapshot.params['id'];
   }
  ngOnInit() {

    this.ProductService.getProductDetail(this.id).subscribe(data =>{
          this.product = data as Product;
          console.log(this.product)
        })
  }

  // ngOnDestroy(): void
  // {alert('se goi truoc khi chuyen page khác')}

}
