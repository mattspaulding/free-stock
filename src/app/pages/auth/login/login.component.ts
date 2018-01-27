import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../@core/data/users.service";
import {isLoop} from "tslint";

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginMessage: string;

  constructor(private userService: UserService) {
    this.loginMessage = "This site must be used with a browser, not inside of another app. (Like the Reddit App)"
  }

  ngOnInit() {
    alert('in loginpage')
    this.userService.login()
      .then((res: any) => {
        console.log('Logged in', res);
        if (!res) {
          this.loginMessage = "You must login with Facebook to access all of the features of FreeStock."
        } else {
          this.loginMessage = "Login successful.";
        }
      })
      .catch((err) => {
        this.loginMessage = "There was an error.";
      });
  }
}
