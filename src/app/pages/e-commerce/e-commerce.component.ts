import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { Router } from '@angular/router';

declare var window: any;
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent  implements OnInit {

  user: any;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    window.FB.XFBML.parse();
    this.getUser();
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
