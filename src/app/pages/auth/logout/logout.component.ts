import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-logout',
  styleUrls: ['./logout.component.scss'],
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit{

  constructor(private userService:UserService){

  }
  ngOnInit(){
    this.userService.logout();
  }
}
