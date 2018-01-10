import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

const counter = 0;

@Injectable()
export class StockService {

  constructor(private http: Http) {

  }

  search(term: String) {
    return this.http.get(environment.apiBaseUrl + '/api/stock/search/' + term)
      .map((response: Response) => {
        const obj = response.json().obj;
        const formattedResponse = [];
        obj.forEach((item) => {
          const quote = {
            name: item.simple_name,
            symbol: item.symbol,
          };
          if (!quote.name) {
            quote.name = item.name;
          }
          formattedResponse.push(quote);
        });

        return formattedResponse;
      })
      .catch((error: Response) => {
        //this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getQuotes(symbols: String) {
    return this.http.get(environment.apiBaseUrl +  '/api/stock/quote/' + symbols)
      .map((response: Response) => {
        const obj = response.json().obj;
        return obj;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  createInvestment(investmentOrderModel: any) {
    const body = JSON.stringify(investmentOrderModel);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Authorization: Bearer ' + localStorage.accessToken});

    const anonId = localStorage.getItem('anonId');
    return this.http.post(environment.apiBaseUrl + '/api/stock/investment/?anonId=' + anonId, body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }



}
