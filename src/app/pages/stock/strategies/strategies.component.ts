import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss'],

})
export class StrategiesComponent implements OnInit {

  user: any;

  settingsLg = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      buyAt: {
        title: 'Buy At',
        type: 'string',
      },
      stopLossPercent: {
        title: 'Stop Loss %',
        type: 'string',
      },
      sellAt: {
        title: 'Sell At',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      bots: {
        title: 'Bots',
        type: 'html',
      },
    },
  };

  settingsMd = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      buyAt: {
        title: 'Buy At',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      bots: {
        title: 'Bots',
        type: 'html',
      },
    },
  };


  settingsSm = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Sym',
        type: 'string',
      },
      buyAt: {
        title: 'Buy At',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
    },
  };

  size: string;

  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService) {

    if (window.innerWidth < 667) {
      this.size = 'sm';
    } else if (window.innerWidth < 1024) {
      this.size = 'md';
    } else {
      this.size = 'lg';
    }

    window.onresize = (e) => {
      if (window.innerWidth < 667) {
        this.size = 'sm';
      } else if (window.innerWidth < 1024) {
        this.size = 'md';
      } else {
        this.size = 'lg';
      }
    };
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUserUpdated()
      .subscribe(data => {
        this.user = data;
        const chartData = [];
        this.user.portfolio.investments.forEach(investment => {
          if (investment.strategy) {
            chartData.push(investment.strategiesChartDatum);
          }
        });
        this.source.load(chartData);
      });
  }

  onUserRowSelect(event): void {
    debugger;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    }
    else {
      event.confirm.reject();
    }
  }
}
