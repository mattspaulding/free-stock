import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {StockService} from "../../../@core/data/stock.service";

@Component({
  selector: 'ngx-rocket',
  styleUrls: ['./rocket.component.scss'],
  templateUrl: './rocket.component.html',
  providers: [StockService],
})
export class RocketComponent implements OnInit {

 // rocketBot: any;

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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.getRocketBot();
  }

  getRocketBot() {
    this.stockService.getRocketBot()
      .subscribe(data => {
        // debugger;
        // this.rocketBot = data;
        // const chartData = [];
        // // this.user.portfolio.investments.forEach(investment => {
        // //   if (investment.activeInvestmentsChartDatum) {
        // //     chartData.push(investment.activeInvestmentsChartDatum);
        // //   }
        // // });
        this.source.load(data.rockets);
      });
  }

  onUserRowSelect(event): void {
    debugger;
  }

}
