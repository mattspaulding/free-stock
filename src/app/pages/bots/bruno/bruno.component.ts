import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { StockService } from '../../../@core/data/stock.service';
import { UserService } from '../../../@core/data/users.service';
import { Router } from "@angular/router";
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ngx-bruno',
  styleUrls: ['./bruno.component.scss'],
  templateUrl: './bruno.component.html',
  providers: [StockService],
})
export class BrunoComponent implements OnInit {

  createdAt: string;

  bargainAlgorithmSettings = {
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

  bargainAlgorithmSource: LocalDataSource = new LocalDataSource();

  user: any;
  newPhone: string;
  newEmail: string;
  config: ToasterConfig;


  constructor(private userService: UserService, private stockService: StockService, private router: Router, private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getBargainAlgorithm() {
    let id = null;
    if (this.user) {
      id = this.user.fbId;
    }
    this.stockService.getBargainAlgorithm(id)
      .subscribe(data => {
        let stocks = [];
        data.forEach(datum => {
          datum.stock.createdAtPretty = moment(datum.stock.createdAt).tz('America/New_York').format('ddd YYYY-MM-DDTHH:mm:ss');
          stocks.push(datum.stock);
        })
        this.bargainAlgorithmSource.load(stocks);
      });
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
        this.getBargainAlgorithm();
      });
  }

  toggleEmailNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setBrunoBotEmailNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isEmailNotify() {
    if (this.user && this.user.isBrunoBotEmailNotify) {
      return true;
    } else {
      return false;
    }
  }

  toggleSmsNotify(isNotify: boolean) {
    if (this.user) {
      this.stockService.setBrunoBotSmsNotify(isNotify)
        .subscribe();
    } else {
      this.userService.goToLogin();
    }
  }

  isSmsNotify() {
    if (this.user && this.user.isBrunoBotSmsNotify) {
      return true;
    } else {
      return false;
    }
  }

  isSmsSubscribed() {
    if (this.user && this.user.stripeCustomer.subscriptions.data.some(sub => {
      return sub.plan.id === 'bruno-sms';
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
    this.userService.addEmailToBrunoList(this.newEmail)
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
    //debugger;
  }

}
