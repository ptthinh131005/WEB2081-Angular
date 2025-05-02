import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-add',
  standalone: true,
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule]
})
export class CategoryAddComponent implements OnInit {
  categoryForm!: FormGroup
  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit() {
  }

  OnAdd(){
    if (this.categoryForm.invalid){
      alert('du lieu khong hop le')
    }else{
      this.categoryService.addCategory(this.categoryForm.value).subscribe(data => {
        location.assign('/admin/category-list')
    })
    }
  }

}
