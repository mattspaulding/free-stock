import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

let counter = 0;

@Injectable()
export class StockService {

  constructor(private http: Http) {

  }

  search(term: String) {
    return this.http.get(environment.apiBaseUrl + '/api/stock/search/' + term)
      .map((response: Response) => {
        const obj = response.json().obj;
        let formattedResponse = [];
        obj.forEach((item) => {
          let quote = {
            name: item.simple_name,
            symbol: item.symbol
          }
          if (!quote.name) {
            quote.name = item.name;
          }
          formattedResponse.push(quote)
        })

        return formattedResponse;
      })
      .catch((error: Response) => {
        //this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


}
