import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingInRequest } from 'src/app/models/SingIn';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup=new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  });

  constructor(private loginService:LoginService, private route:Router, private toast:ToastrService) { }


  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    this.toast.info('Verificando credenciales...', 'Iniciando sesión', {timeOut: 1000});
    if (this.loginForm.valid) {
      const body = this.loginForm.value as SingInRequest;
      this.loginService.SingIn(body).subscribe(response=>{
        localStorage.setItem('Token',response.Token);
        localStorage.setItem('UserId',response.UserId.toString());
        this.route.navigate(['/task']);
      },err=>{
        this.toast.error(err.error.Message,'Error', {timeOut: 2500});
      });
    }
  }
}
