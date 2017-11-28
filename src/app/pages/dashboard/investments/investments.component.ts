import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],

})
export class InvestmentsComponent implements OnChanges {

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
      amountChange: {
        title: '$ Change',
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

  @Input() user;
  size: string;

  source: LocalDataSource = new LocalDataSource();

  constructor() {
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.user) {
      const buyChartData = [];
      this.user.portfolio.investments.forEach(investment => {
        buyChartData.push(investment.buyChartDatum);
      });
      this.source.load(buyChartData);
    }
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
