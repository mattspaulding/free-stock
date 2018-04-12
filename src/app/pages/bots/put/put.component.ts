import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { StockService } from '../../../@core/data/stock.service';
import { UserService } from '../../../@core/data/users.service';
import { Router } from "@angular/router";
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ngx-put',
  styleUrls: ['./put.component.scss'],
  templateUrl: './put.component.html',
  providers: [StockService],
})
export class PutComponent implements OnInit {

  createdAt: string;


  putAlgorithmSettings = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
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

  putAlgorithmSource: LocalDataSource = new LocalDataSource();

  user: any;
  newPhone: string;
  newEmail: string;
  config: ToasterConfig;


  constructor(private userService: UserService, private stockService: StockService, private router: Router, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.getUser();
    //this.getPutAlgorithmData();
  }

  getPutAlgorithm() {
    this.stockService.getPutAlgorithm()
      .subscribe(data => {
        let stocks = [];
        data.forEach(datum => {
          datum.stock.createdAtPretty = moment(datum.stock.createdAt).tz('America/New_York').format('ddd YYYY-MM-DD HH:mm:ss');
          stocks.push(datum.stock);
        })
        this.putAlgorithmSource.load(stocks);
      });
  }

  getPutAlgorithmData() {
    this.stockService.getPutAlgorithmData()
      .subscribe(data => {
        debugger;
        let stocks = [];
        data.forEach(datum => {
          datum.stock.createdAtPretty = new Date(datum.stock.createdAt).toString().replace(' GMT-0500', '');
          stocks.push(datum.stock);
        })
        this.putAlgorithmSource.load(stocks);
      });
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
        this.getPutAlgorithm();
      });
  }

  toggleEmailNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setPutBotEmailNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isEmailNotify() {
    if (this.user && this.user.isPutBotEmailNotify) {
      return true;
    } else {
      return false;
    }
  }

  toggleSmsNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setPutBotSmsNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isSmsNotify() {
    if (this.user && this.user.isPutBotSmsNotify) {
      return true;
    } else {
      return false;
    }
  }

  // toggleExtended(isExtended: boolean) {
  //   if (this.user) {
  //     this.stockService.setPutBotExtendedHours(isExtended)
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
  //   if (this.user && this.user.isPutBotExtendedHours) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  isSmsSubscribed() {
    if (this.user && this.user.stripeCustomer.subscriptions.data.some(sub => {
      return sub.plan.id === 'put-sms';
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

  // addEmailToList() {
  //   this.userService.addEmailToPutList(this.newEmail)
  //     .subscribe(data => {
  //         this.newEmail = "";
  //         this.toasterService.popAsync({type: 'success', title: data.message});
  //       },
  //       error => {

  //       }
  //     );
  // }


  changeEmail() {
    this.router.navigate(["subscriptions"]);
  }


  goToLogin() {
    this.userService.goToLogin();
  }


  onUserRowSelect(event): void {
    //debugger;
  }

}
