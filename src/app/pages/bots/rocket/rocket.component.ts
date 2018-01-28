import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {StockService} from '../../../@core/data/stock.service';
import {UserService} from '../../../@core/data/users.service';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-rocket',
  styleUrls: ['./rocket.component.scss'],
  templateUrl: './rocket.component.html',
  providers: [StockService],
})
export class RocketComponent implements OnInit {

  createdAt: string;

  settings = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      rocketFuel: {
        title: 'Rocket Fuel',
        type: 'string',
      },
      createdAtPretty: {
        title: 'Spotted',
        type: 'string',
      },
      // updatedRocketFuel: {
      //   title: 'Fuel Update',
      //   type: 'string',
      // }
      // ,
      // updatedAtPretty: {
      //   title: 'Updated',
      //   type: 'string',
      // }
    },
    pager:
      {
        perPage: 20
      }
  };

  source: LocalDataSource = new LocalDataSource();

  user: any;
  newPhone: string;
  newEmail: string;

  constructor(private userService: UserService, private stockService: StockService, private router: Router) {
  }

  ngOnInit() {
    this.getRocketBot();
    this.getUser();
  }

  getRocketBot() {
    this.stockService.getRocketBot()
      .subscribe(data => {
        let rockets = [];
        data.forEach(datum => {
          datum.rocket.createdAtPretty = new Date(datum.rocket.createdAt).toString().replace(' GMT-0500', '');
          if (datum.rocket.updatedAt) {
            datum.rocket.updatedAtPretty = new Date(datum.rocket.updatedAt).toString().replace(' GMT-0500', '');
          }
          rockets.push(datum.rocket);
        })
        this.source.load(rockets);
      });
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
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

  addEmailToRocketList() {
    this.userService.addEmailToRocketList(this.newEmail)
      .subscribe(data => {
          this.newEmail = "";
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
