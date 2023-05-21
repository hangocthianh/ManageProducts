import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']
})

export class LoginComponent implements OnInit {
  userName='';
  password='';
  errorMsg='';
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() { }
  login(){
   if(this.userName.trim().length===0){
    this.errorMsg='User name is required';
   } else if(this.password.trim().length===0){
    this.errorMsg = "Password is required";
   } else{
    this.errorMsg='';
    let res = this.auth.login(this.userName, this.password);
    if(res===200){
      this.route.navigate(['home'])
    }
    if(res===403){
      this.errorMsg='Invalid Credentials';
    }
   }
  }
}