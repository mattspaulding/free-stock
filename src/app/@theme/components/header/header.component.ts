import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  profilePicture: string;
  username: string;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    //this.tryLogin();
    this.getLoginStatus();
  }

  // tryLogin(): void {
  //   this.userService.getUser()
  //     .subscribe(
  //       user => {
  //         if (user) {
  //           this.user = user;
  //           this.user.picture = '//graph.facebook.com/' + user.fbId + '/picture?type=square'
  //         } else {
  //           // let keepLogin = localStorage.getItem('keepLogin');
  //           // if (keepLogin) {
  //           this.userService.login();
  //           //}
  //         }
  //         // this.getPortfolio();
  //       },
  //       error => console.error(error)
  //     );
  // }

  getLoginStatus(): void {
    this.userService.getLoginStatus()
      .then(data => {
        if (data.status === 'connected') {

          this.getProfile();
        }
      })
  }

  login(): void {
    this.userService.login()
      .then(data => {
        if (!data) {
///TODO throw toastr
        }
        else if (data.status === 'connected') {

          this.getProfile();
        }
      })
  }

  getProfile(): void {
    this.userService.getProfile()
      .then(data => {
        this.profilePicture = '//graph.facebook.com/' + data.id + '/picture?type=square'
        this.username = data.name;
             this.getUser();
       })
  }

  logout(): void {
    this.userService.logout()
      .then(data => {
        if (data.status === 'unknown') {
          this.profilePicture = null;
          this.username = null;
        }
      })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        debugger;
        this.user = data;
      });
  }

  //
  // getPortfolio() {
  //   debugger;
  //   this.userService.getPortfolio()
  //     .subscribe(data => {
  //       debugger;
  //       // this.portfolio = data.portfolio;
  //       let body = document.getElementById("body");
  //       // if (this.portfolio.account.isMarketOpen !== undefined) {
  //       //     if (this.portfolio.account.isMarketOpen) {
  //       //         body.className = "fixed-sn white-skin";
  //       //     } else {
  //       //         body.className = "fixed-sn black-skin";
  //       //     }
  //       // }
  //     });
  // }


}
