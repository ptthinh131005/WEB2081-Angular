import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [RouterModule, ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    registerF!: FormGroup;
    constructor(private authService: AuthService) {
        this.registerF = new FormGroup({
            'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'fullname': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'rePassword': new FormControl('', Validators.required)
        })
        this.loginForm = new FormGroup({
          'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      })
        this.registerF.setValidators(this.passwordMatchValidator());
    }


    ngOnInit() {
    }
    passwordMatchValidator(): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const password = formGroup.get('password')?.value;
            const confirmPassword = formGroup.get('rePassword')?.value;

            if (password !== confirmPassword) {
                return { mismatch: true };
            } else {
                return null;
            }

        }
    }
    OnLogin(){
        if (this.loginForm.invalid){
          alert('du lieu khong hop le')
        }else{
          this.authService.login(this.loginForm.value).subscribe(data => {
            alert('Bạn đã đăng nhập thành công');
            let jsonData =JSON.stringify(data);
            localStorage.setItem('login', jsonData);
            location.assign('/')
        })
        }
    }

    OnRegister() {
        if (this.registerF.invalid) {
            alert('Dữ liệu không hợp lệ')
        } else {
            this.authService.register(this.registerF.value).subscribe(data => {
                alert('Bạn đã đăng ký thành công')
            })
        }
        console.log(this.registerF)
    }
}
