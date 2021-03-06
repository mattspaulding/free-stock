import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {StockService} from '../../../@core/data/stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnalyticsService} from "../../../@core/utils/analytics.service";
import {UserService} from "../../../@core/data/users.service";

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
  user:any;

  constructor(private analytics: AnalyticsService,private userService:UserService,private stockService: StockService, private router: Router, private route: ActivatedRoute) {
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
    //   });debugger;
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
      });
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
    this.analytics.trackEvent("search: "+symbol);
    this.stockService.getQuotes(symbol)
      .subscribe(data => {
          this.model = null;
          this.stockQuoteModel = data;
          this.investmentOrderModel = {
            brunoOn: false,
            buyAt: (data.last_trade_price * 0.95).toFixed(2),
            geoffreyOn: true,
            stopLossPercent: 10,
            sellAt: (data.last_trade_price * 1.15).toFixed(2),
            name: data.instrumentBody.name,
            quantity: 1,
            symbol: data.symbol.toUpperCase(),
            bid: Number(data.last_trade_price).toFixed(2),
          };
        },
        error => console.error(error),
      );
  }

  createInvestment() {
   this.stockService.createInvestment(this.investmentOrderModel)
      .subscribe(data => {
          this.router.navigate([ data.navigate]);
        },
        error => {
          alert(error.title)
        }
      );
  }
}
