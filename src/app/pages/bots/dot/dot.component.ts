import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from "@angular/router";
import { StockService } from "../../../@core/data/stock.service";
import { UserService } from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-dot',
  styleUrls: ['./dot.component.scss'],
  templateUrl: './dot.component.html',
  providers: [StockService],
})
export class DotComponent {

  chart: any;
  description: string;
  symbol: string;
  standardPercentChange: string;
  algoPercentChange: string;

  constructor(private stockService: StockService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params['symbol']);
      if (params['symbol']) {
        this.symbol = params['symbol']
        this.getChart(params['symbol']);
      } else {
        this.symbol = "MU"
        this.getChart("MU")
      }
    });
  }

  getChart(symbol) {

    if (symbol === "MU") {
      this.description = "A booming tech stock"
    }
    if (symbol === "NFLX") {
      this.description = "A media power house"
    }
    if (symbol === "RAD") {
      this.description = "A failing drug store"
    }
    if (symbol === "BTC-USD") {
      this.description = "The cryptocurrency"
    }
    if (symbol === "ETH-USD") {
      this.description = "A popular cryptocurrency"
    }

    this.stockService.getDotBot(symbol)
      .subscribe(data => {

        this.standardPercentChange = data.data.standardPercentChange.toFixed(2);
        this.algoPercentChange = data.data.algoPercentChange.toFixed(2);

        const el = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = el.getContext('2d');
        if (this.chart) {
          this.chart.data.datasets= [{
              label: "Buy",
              borderColor: 'lightgreen',
              data: data.data.buys,
              tension: 0,
              fill: false,
              pointRadius: 0,
              borderWidth: 2
            }, {
              label: "Sell",
              borderColor: 'darkred',
              data: data.data.prices,
              tension: 0,
              fill: false,
              pointRadius: 0,
              borderWidth: 2
            }]
            this.chart.update();
        } else {
          this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
              labels: data.data.dates,
              datasets: [{
                label: "Buy",
                borderColor: 'lightgreen',
                data: data.data.buys,
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 2
              }, {
                label: "Sell",
                borderColor: 'darkred',
                data: data.data.prices,
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 2
              }]
            },

            // Configuration options go here
            options: {}
          });
        }

      });

  }

  changeRoute(symbol: string) {
    this.router.navigate(['bots/dot/' + symbol]);
  }
}
