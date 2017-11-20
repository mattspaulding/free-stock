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

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.tryLogin();
  }

  tryLogin(): void {
    this.userService.getUser()
      .subscribe(
        user => {
          if (user) {
            this.user = user;
            this.user.picture = '//graph.facebook.com/' + user.fbId + '/picture?type=square'
          } else {
            // let keepLogin = localStorage.getItem('keepLogin');
            // if (keepLogin) {
            this.userService.loginFacebook();
            //}
          }
          // this.getPortfolio();
        },
        error => console.error(error)
      );
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

  getPortfolio() {
    this.userService.getPortfolio()
      .subscribe(data => {
        debugger;
        // this.portfolio = data.portfolio;
        let body = document.getElementById("body");
        // if (this.portfolio.account.isMarketOpen !== undefined) {
        //     if (this.portfolio.account.isMarketOpen) {
        //         body.className = "fixed-sn white-skin";
        //     } else {
        //         body.className = "fixed-sn black-skin";
        //     }
        // }
      });
  }


}
