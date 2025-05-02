import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../../../asm/src/app/services/category.service';
import { Category } from '../../../model/category';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule]
})
export class CategoryEditComponent implements OnInit {
  id!: string
  category!: Category
  categoryForm!: FormGroup
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id']

    this.categoryService.getCategoryDetail(this.id).subscribe(data => {
      this.category = data as Category;
      this.categoryForm = new FormGroup({
        'name': new FormControl(this.category.name, [Validators.required, Validators.minLength(6)])
      });
    })
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Dữ liệu không hợp lệ');
    } else {
      this.categoryService.updateCategory(this.id, this.categoryForm.value).subscribe(data => {
        location.assign('/admin/category-list');
      })
    }
  }

}
