import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule, FormsModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  keyword: string = '';
  categories!: Category[];
  isADM:any
  isLogin:any
  constructor(private categoryService: CategoryService, private router: Router,private autService: AuthService) {
    this.isADM = autService.checkAdmin()
    this.isLogin = autService.checkLogin()
   }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories)
    })
  }

  onSearch() {
    if (this.keyword.trim().length > 3) {
      this.router.navigate(['products'], { queryParams: { 'keyword': this.keyword } })
    } else {
      this.keyword = '';
      alert('Hay nhap it nhat 3 ki tu')
    }
  }

  onLogout(){
    localStorage.clear()
    location.assign('/'); 
  }
}
