import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
      });
  }
}
