import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-completed-investments',
  templateUrl: './completed-investments.component.html',
  styleUrls: ['./completed-investments.component.scss'],

})
export class CompletedInvestmentsComponent implements OnInit {

  user: any;

  settingsLg = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      percentChange: {
        title: '% Change',
        type: 'string',
      },
      bought: {
        title: 'Bought',
        type: 'string',
      },
      amountChange: {
        title: '$ Change',
        type: 'string',
      },
      price: {
        title: 'Sold',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      totalAmountChange: {
        title: 'Tot $Chng',
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
      percentChange: {
        title: '% Change',
        type: 'string',
      },
      amountChange: {
        title: '$ Change',
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
      percentChange: {
        title: '% Chg',
        type: 'string',
      },
      amountChange: {
        title: '$ Chg',
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
        if(this.user) {
          this.user.portfolio.investments.forEach(investment => {
            if (investment.completedInvestmentsChartDatum) {
              chartData.push(investment.completedInvestmentsChartDatum);
            }
          });
        }
        this.source.load(chartData);
       });
  }

  onUserRowSelect(event): void {
    debugger;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')
    ) {
      event.confirm.resolve();
    }
    else {
      event.confirm.reject();
    }
  }
}
