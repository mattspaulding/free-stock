import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from "@angular/router";
import { StockService } from "../../../@core/data/stock.service";
import { UserService } from "../../../@core/data/users.service";

@Component({
  selector: 'ngx-swing',
  styleUrls: ['./swing.component.scss'],
  templateUrl: './swing.component.html',
  providers: [StockService],
})
export class SwingComponent {

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
    if (symbol === "NVDA") {
      this.description = "A graphics card"
    }
    if (symbol === "FB") {
      this.description = "Social media"
    }
    if (symbol === "TSLA") {
      this.description = "Smart cars"
    }
    if (symbol === "RAD") {
      this.description = "A failing drug store"
    }
    if (symbol === "FSLR") {
      this.description = "A solar company"
    }
    if (symbol === "HMNY") {
      this.description = "The worst meme stock"
    }
    if (symbol === "BTC-USD") {
      this.description = "The cryptocurrency"
    }
    if (symbol === "ETH-USD") {
      this.description = "A popular cryptocurrency"
    }

    this.stockService.getSwingBot(symbol)
      .subscribe(data => {

        this.standardPercentChange = data.data.standardPercentChange.toFixed(2);
        this.algoPercentChange = data.data.algoPercentChange.toFixed(2);
        let chartData = data.data.chartData;
        let bulls = [];
        let bears = [];
        let buys = [];
        let sells = [];
        let targets = [];
        let dates = [];
        let closes = [];
        let ema12 = [];
        let ema26 = [];
        let smacd = [];
        let signal = [];
        let algoAmountChange = [];
        let algoAmountDiff = [];
        for (let i = 1; i < chartData.length; i++) {
          dates[i] = chartData[i].date;
          closes[i] = chartData[i].close;
          targets[i] = chartData[i].target;
          bulls[i] = chartData[i].bull;
          bears[i] = chartData[i].bear;
          buys[i] = chartData[i].buy;
          sells[i] = chartData[i].sell;
          ema12[i] = chartData[i].ema[12];
          ema26[i] = chartData[i].ema[26];
          smacd[i] = chartData[i].smacd;
          signal[i] = chartData[i].signal;
          algoAmountChange[i] = chartData[i].algoAmountChange;
          algoAmountDiff[i] = chartData[i].algoAmountDiff;
        }

        let datasets = [{
          label: "Bull",
          borderColor: 'lightgreen',
          data: bulls,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 2
        }, {
          label: "Bear",
          borderColor: 'darkred',
          data: bears,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 2
        },
        {
          label: "Buy",
          borderColor: 'lightgreen',
          data: buys,
          tension: 0,
          fill: false,
          pointRadius: 4,
          borderWidth: 2
        }, {
          label: "Sell",
          borderColor: 'darkred',
          data: sells,
          tension: 0,
          fill: false,
          pointRadius: 4,
          borderWidth: 2
          // }, {
          //   label: "EMA12",
          //   borderColor: 'blue',
          //   data: ema12,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 1
          // }, {
          //   label: "EMA26",
          //   borderColor: 'green',
          //   data: ema26,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 1
        }, {
          label: "SMACD",
          borderColor: 'red',
          data: smacd,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }, {
          label: "Signal",
          borderColor: 'yellow',
          data: signal,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }, {
          label: "Target",
          borderColor: 'black',
          data: targets,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }, {
          label: "Close",
          borderColor: 'blue',
          data: closes,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }, {
          label: "Change",
          borderColor: 'yellow',
          data: algoAmountChange,
          tension: 0,
          fill: false,
          pointRadius: 5,
          borderWidth: 4
        }, {
          label: "Diff",
          borderColor: 'green',
          data: algoAmountDiff,
          tension: 0,
          fill: false,
          pointRadius: 5,
          borderWidth: 3
        }]

        const el = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = el.getContext('2d');
        if (this.chart) {
          this.chart.data.datasets = datasets
          this.chart.update();
        } else {
          this.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
              labels: dates,
              datasets: datasets
            },

            // Configuration options go here
            options: {
              responsive: true,
              title: {
                display: true,
                text: 'Swing Bot'
              },
              // tooltips: {
              //   position: 'nearest',
              //   mode: 'index',
              //   intersect: false,
              //   yPadding: 10,
              //   xPadding: 10,
              //   caretSize: 8,
              //   backgroundColor: 'rgba(72, 241, 12, 1)',
              //   borderColor: 'rgba(0,0,0,1)',
              //   borderWidth: 4
              // },
            },
            
          });
        }

      });

  }

  changeRoute(symbol: string) {
    this.router.navigate(['bots/swing/' + symbol]);
  }
}
