import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../@core/data/users.service";
import {isLoop} from "tslint";

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
isLoggedIn:string;
  constructor(private userService:UserService){
this.isLoggedIn="dunno"
  }
  ngOnInit(){
    this.userService.login()
      .then((res: any) => {
        console.log('Logged in', res);
        debugger;
        this.isLoggedIn="logged in";
        // if (res.authResponse.grantedScopes.includes('email')) {
        //   localStorage.accessToken = res.authResponse.accessToken;
        //   this.router.navigate([""]);
        //   location.reload()
        //   return res;
        // } else {
        //   this.login();
        // }
      })
      .catch((err) => {
        debugger;
        this.isLoggedIn="problem with login"
        alert('problem logging in:'+err)
        // return false;
      });

  }
}
