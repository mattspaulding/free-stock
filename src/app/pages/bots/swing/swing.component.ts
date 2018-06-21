import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from "@angular/router";
import { StockService } from "../../../@core/data/stock.service";
import { LocalDataSource } from 'ng2-smart-table';

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
  close: string;
  analysis: string;

  swingBotSettings = {
    actions: null,
    hideSubHeader: true,
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      side: {
        title: 'Side',
        type: 'string',
      },
      target: {
        title: 'Target',
        type: 'string',
      },
    },
    pager:
    {
      perPage: 20
    }
  };
  swingBotSource: LocalDataSource = new LocalDataSource();


  constructor(private stockService: StockService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params['symbol']);
      if (params['symbol']) {
        this.symbol = params['symbol']
        this.getChart(params['symbol']);
      }
      this.swingBotSource.load([{
        symbol: "MU",
        side: "coming soon",
        target: "$XX.XX"
      }, {
        symbol: "NFLX",
        side: "coming soon",
        target: "$XX.XX"
      }, {
        symbol: "TSLA",
        side: "coming soon",
        target: "$XX.XX"
      }, {
        symbol: "LRCX",
        side: "coming soon",
        target: "$XX.XX"
      }, {
        symbol: "GE",
        side: "coming soon",
        target: "$XX.XX"
      }]);

    });
  }

  getChart(symbol) {


    this.stockService.getSwingBot(symbol)
      .subscribe(data => {

        this.standardPercentChange = data.data[0].standardPercentChange.toFixed(2);
        this.algoPercentChange = data.data[0].algoPercentChange.toFixed(2);
        let chartData = data.data[0].chartData;
        this.close = chartData[chartData.length - 1].close.toFixed(2);
        let isHas = chartData[chartData.length - 1].isHas;
        let target = chartData[chartData.length - 1].target.toFixed(2);

        this.analysis = ''
        if (isHas) {
          this.analysis = 'You should own this stock and have a sell stoploss set at $' + target;
        } else {
          this.analysis = 'You should not own this stock and have a buy stoploss set at $' + target;
        }

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
        let algoAmountChangeAdjusted = [];
        let algoAmountDiff = [];
        for (let i = 1; i < chartData.length; i++) {
          dates[i] = chartData[i].date;
          closes[i] = chartData[i].close;
          targets[i] = chartData[i - 1].target;
          bulls[i] = chartData[i].bull;
          bears[i] = chartData[i].bear;
          buys[i] = chartData[i].buy;
          sells[i] = chartData[i].sell;
          // ema12[i] = chartData[i].ema[12];
          // ema26[i] = chartData[i].ema[26];
          smacd[i] = chartData[i].smacd;
          signal[i] = chartData[i].signal;
          algoAmountChange[i] = chartData[i].algoAmountChange;
          algoAmountChangeAdjusted[i] = chartData[i].algoAmountChangeAdjusted;
          algoAmountDiff[i] = chartData[i].algoAmountDiff;
        }

        let datasets = [{
          //   label: "Bull",
          //   borderColor: 'lightgreen',
          //   data: bulls,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 2
          // }, {
          //   label: "Bear",
          //   borderColor: 'darkred',
          //   data: bears,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 2
          // },
          // {
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
          // }, {
          //   label: "SMACD",
          //   borderColor: 'red',
          //   data: smacd,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 1
          // }, {
          //   label: "Signal",
          //   borderColor: 'yellow',
          //   data: signal,
          //   tension: 0,
          //   fill: false,
          //   pointRadius: 0,
          //   borderWidth: 1
        }, {
          label: "Target",
          borderColor: 'blue',
          data: targets,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }, {
          label: "Close",
          borderColor: 'black',
          data: closes,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 2
          // }, {
          //   label: "Position PnL",
          //   borderColor: 'green',
          //   data: algoAmountDiff,
          //   tension: 0,
          //   fill: false,
          //   showLine: false,
          //   pointRadius: 5,
          //   borderWidth: 3
        }, {
          label: "Total PnL",
          borderColor: 'yellow',
          data: algoAmountChangeAdjusted,
          tension: 0,
          fill: false,
          pointRadius: 0,
          borderWidth: 4
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
            options: {},

          });
        }

      });

  }

  onUserRowSelect(event): void {
    this.changeRoute(event.data.symbol);
  }

  changeRoute(symbol: string): void {
    this.router.navigate(['bots/swing/' + symbol]);
  }
}
