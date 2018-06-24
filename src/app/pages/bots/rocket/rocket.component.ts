import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { StockService } from '../../../@core/data/stock.service';
import { UserService } from '../../../@core/data/users.service';
import { Router } from "@angular/router";
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as moment from 'moment-timezone';
import { Meta, Title } from '@angular/platform-browser';
declare var window: any;
@Component({
  selector: 'ngx-rocket',
  styleUrls: ['./rocket.component.scss'],
  templateUrl: './rocket.component.html',
  providers: [StockService],
})
export class RocketComponent implements OnInit {
  pageTitle:string="Rocket Bot"

  createdAt: string;


  rocketAlgorithmSettings = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      rating: {
        title: 'Rocket Fuel',
        type: 'string',
      },
      percentChangePretty: {
        title: '% Chg',
        type: 'string',
      },
      createdAtPretty: {
        title: 'Spotted',
        type: 'string',
      },
    },
    pager:
      {
        perPage: 20
      }
  };

  rocketAlgorithmSource: LocalDataSource = new LocalDataSource();

  user: any;
  newPhone: string;
  newEmail: string;
  config: ToasterConfig;




  constructor(private titleService: Title, private meta: Meta, private userService: UserService, private stockService: StockService, private router: Router, private toasterService: ToasterService) {
  }

  ngOnInit() {
    window.FB.XFBML.parse();
    this.titleService.setTitle( 'Rocket Bot' );
    this.meta.addTags([
      { name: 'description', content: 'These uptrending stocks are showing strange fluctuations in volume. The technicals are good. Buckle up; we are go for launch.' }
    ]);
    this.getUser();
    //this.getRocketAlgorithmData();
  }

  getRocketAlgorithm() {
    this.stockService.getRocketAlgorithm()
      .subscribe(data => {
        let stocks = [];
        data.forEach(datum => {
          datum.stock.createdAtPretty = moment(datum.stock.createdAt).tz('America/New_York').format('ddd YYYY-MM-DD HH:mm:ss');
          stocks.push(datum.stock);
        })
        this.rocketAlgorithmSource.load(stocks);
      });
  }

  getRocketAlgorithmData() {
    this.stockService.getRocketAlgorithmData()
      .subscribe(data => {
        debugger;
        let stocks = [];
        data.forEach(datum => {
          datum.stock.createdAtPretty = new Date(datum.stock.createdAt).toString().replace(' GMT-0500', '');
          stocks.push(datum.stock);
        })
        this.rocketAlgorithmSource.load(stocks);
      });
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
        this.getRocketAlgorithm();
      });
  }

  toggleEmailNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setRocketBotEmailNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isEmailNotify() {
    if (this.user && this.user.isRocketBotEmailNotify) {
      return true;
    } else {
      return false;
    }
  }

  toggleSmsNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setRocketBotSmsNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isSmsNotify() {
    if (this.user && this.user.isRocketBotSmsNotify) {
      return true;
    } else {
      return false;
    }
  }

  // toggleExtended(isExtended: boolean) {
  //   if (this.user) {
  //     this.stockService.setRocketBotExtendedHours(isExtended)
  //       .subscribe(data => {
  //           this.user = data.obj;
  //         },
  //         error => {
  //           this.router.navigate(["subscriptions"]);
  //         }
  //       );
  //   } else {
  //     this.userService.goToLogin();
  //   }
  // }

  // isExtendedHours() {
  //   if (this.user && this.user.isRocketBotExtendedHours) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  isSmsSubscribed() {
    if (this.user && this.user.stripeCustomer.subscriptions.data.some(sub => {
      return sub.plan.id === 'rocket-sms';
    })) {
      return true;
    } else {
      return false;
    }
  }

  addPhone() {
    this.userService.addPhone(this.newPhone)
      .subscribe(data => {
        this.user = data.obj;
      },
        error => {

        }
      );
  }

  deletePhone() {
    this.userService.addPhone(null)
      .subscribe(data => {
        this.user = data.obj;
      },
        error => {

        }
      );
  }

  addEmailToList() {
    this.userService.addEmailToRocketList(this.newEmail)
      .subscribe(data => {
        this.newEmail = "";
        this.toasterService.popAsync({ type: 'success', title: data.message });
      },
        error => {

        }
      );
  }


  changeEmail() {
    this.router.navigate(["subscriptions"]);
  }


  goToLogin() {
    this.userService.goToLogin();
  }


  onUserRowSelect(event): void {
    this.changeRoute(event.data.symbol);
  }

  changeRoute(symbol: string): void {
    this.router.navigate(['stock/search/' + symbol]);
  }
}
