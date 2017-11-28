import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService){

  }
  ngOnInit(){
    this.userService.login();
  }
}
