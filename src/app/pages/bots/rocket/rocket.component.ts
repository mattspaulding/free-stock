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
      ,
      createdAtPretty: {
        title: 'Added',
        type: 'string',
      },
      updatedRocketFuel: {
        title: 'Fuel Update',
        type: 'string',
      }
      ,
      updatedAtPretty: {
        title: 'Updated',
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
        let rockets=[];
        data.forEach(datum=>{
          datum.rocket.createdAtPretty= new Date(datum.rocket.createdAt).toString().replace(' GMT-0500','');
          datum.rocket.updatedAtPretty= new Date(datum.rocket.updatedAt).toString().replace(' GMT-0500','');
          rockets.push(datum.rocket);
        })
        this.source.load(rockets);
      });
  }

  onUserRowSelect(event): void {
    debugger;
  }

}
