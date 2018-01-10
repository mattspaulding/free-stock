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
      }
    },
    pager:
      {
        perPage: 6
      }
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
        this.createdAt = data.createdAt;
        this.source.load(data.rockets);
      });
  }

  onUserRowSelect(event): void {
    debugger;
  }

}
