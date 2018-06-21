import {Component, OnInit} from '@angular/core';
import {UserService} from '../../@core/data/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
   // this.getUser();
  }

  getUser() {
    this.userService.getUserUpdated()
      .subscribe(data => {
        this.user = data;
      });
  }

  changeRoute(bot: string): void {
    this.router.navigate(['bots/' + bot]);
  }
}
