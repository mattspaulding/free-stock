import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {StockService} from '../../../@core/data/stock.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [StockService],
})
export class SearchComponent implements OnInit {
  model: any;
  investmentOrderModel: any;
  stockQuoteModel: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private stockService: StockService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params['symbol']);
      if (params['symbol']) {
        this.getQuote(params['symbol']);
      }
    });
  }

  ngOnInit() {
    // // subscribe to router event
    // let sdfsdf=this.route.snapshot.paramMap.get('symbol');
    // debugger;
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => {
    //     // (+) before `params.get()` turns the string into a number
    //     debugger;
    //     let selectedId = params.get('symbol');
    //    // return this.service.getHeroes();
    //   });
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.stockService.search(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)

  changeRoute(symbol: string) {
    this.router.navigate(['stock/search/' + symbol]);
  }


  getQuote(symbol: string) {
    this.stockService.getQuotes(symbol)
      .subscribe(data => {
          this.model = null;
          this.stockQuoteModel = data;
          this.investmentOrderModel = {
            brunoOn: true,
            buyAt: data.last_trade_price * 0.95,
            geoffreyOn: true,
            stopLossPercent: 10,
            dotOn: true,
            sellAt: data.last_trade_price * 1.15,
            name: data.instrumentBody.name,
            quantity: 3,
            symbol: data.symbol.toUpperCase(),
            bid: data.last_trade_price,
          };
        },
        error => console.error(error),
      );
  }

  buyNow() {
    debugger;
    const sdfsdf = this.investmentOrderModel;
  }

  createStrategy() {
    debugger;
    this.stockService.createInvestment(this.investmentOrderModel)
      .subscribe(data => {
          debugger;
        },
        error => console.error(error),
      );
  }
}
