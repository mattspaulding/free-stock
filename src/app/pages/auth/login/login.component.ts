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
    this.loginMessage = "Loading."
  }

  ngOnInit() {
    alert('in loginpage')
    this.userService.login()
      .then((res: any) => {
        console.log('Logged in', res);
        debugger;

        if (!res) {
          this.loginMessage = "There was a problem logging in. Try using a different browser. Especially if you are in an app, like the Reddit app."
        } else {
          this.loginMessage = "Login successful.";
        }
      })
      .catch((err) => {
        this.loginMessage = "There was an error.";

      });

  }
}
