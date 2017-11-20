import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import { environment } from 'environments/environment';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: {name: 'Nick Jones', picture: 'assets/images/nick.png'},
    eva: {name: 'Eva Moor', picture: 'assets/images/eva.png'},
    jack: {name: 'Jack Williams', picture: 'assets/images/jack.png'},
    lee: {name: 'Lee Wong', picture: 'assets/images/lee.png'},
    alan: {name: 'Alan Thompson', picture: 'assets/images/alan.png'},
    kate: {name: 'Kate Martinez', picture: 'assets/images/kate.png'},
  };

  private userArray: any[];

  constructor(private http: Http, private fb: FacebookService) {
    console.log('Initializing Facebook');

    fb.init({
      appId: '1123046611129559',
      version: 'v2.9'
    });
  }

  /**
   * Login with additional permissions/options
   */
  login() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email'
    };

    return this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        localStorage.accessToken = res.authResponse.accessToken;
        return res;
      })
      .catch(() => {
        return;
      });

  }

  getLoginStatus() {
    return this.fb.getLoginStatus()
      .then(res => {
        console.log('login status: ' + res.status)
        if (res.authResponse)
          localStorage.accessToken = res.authResponse.accessToken;

        return res;
      })
      .catch((error) => {
        return error;
      });
  }


  /**
   * Get the user's profile
   */
  getProfile() {
    return this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * logout
   */
  logout() {
    return this.fb.logout().then((res) => {
      console.log('Logged out!')
      return res
    });
  }

  // /**
  //  * Show the share dialog
  //  */
  // share() {
  //
  //   const options: UIParams = {
  //     method: 'share',
  //     href: 'https://github.com/zyramedia/ng2-facebook-sdk'
  //   };
  //
  //   this.fb.ui(options)
  //     .then((res: UIResponse) => {
  //       console.log('Got the users profile', res);
  //     })
  //     .catch(this.handleError);
  //
  // }


  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  // getUser(): Observable<any> {
  //   debugger;
  //   const domain = '//localhost:3000';
  //
  //   return this.http.get(domain + '/api/stock/user')
  //     .map((response: Response) => {
  //     debugger;
  //         return response.json();
  //       }
  //     )
  //     .catch((error: Response) => {
  //       debugger;
  //       return Observable.throw(error.json());
  //     });
  //   // counter = (counter + 1) % this.userArray.length;
  //   // return Observable.of(this.userArray[counter]);
  // }

  getUser() {
    if (localStorage.accessToken) {
      const domain = '//localhost:3000';
      const headers = new Headers({'Authorization': 'Authorization: Bearer ' + localStorage.accessToken});

      return this.http.get(environment.apiBaseUrl + '/api/stock/account', {headers: headers})
        .map((response: Response) => {
          let user = response.json().obj;
          localStorage.setItem('anonId', user.anonId);
          user.portfolio.strategies = [];
          user.portfolio.buyCollars = [];
          user.portfolio.sellCollars = [];
          user.portfolio.collars.forEach((collar) => {
            if (collar.sellOrder) {
              user.portfolio.sellCollars.push(collar)
            } else if (collar.buyOrder) {
              user.portfolio.buyCollars.push(collar)
            } else {
              user.portfolio.strategies.push(collar)
            }
          })
          return user;
        })
        .catch((error: Response) => {
          // this.errorService.handleError(error.json());
          localStorage.removeItem('accessToken');
          return Observable.throw(error.json());
        });
    } else {
      return Observable.of(null);
    }
  }

  // loginFacebook(): void {
  //   // if (this.keepLogin) {
  //   localStorage.setItem('keepLogin', 'keepLogin')
  //   // }
  //   //
  //   // const domain = '//localhost:3000';
  //   //
  //   // window.location.href = domain + '/login/facebook'
  //
  //   const loginOptions: LoginOptions = {
  //     enable_profile_selector: true,
  //     return_scopes: true,
  //     scope: 'email'
  //   };
  //
  //   this.fb.login(loginOptions)
  //     .then((res: LoginResponse) => {
  //       console.log('Logged in', res);
  //       localStorage.setItem('accessToken', res.authResponse.accessToken);
  //       this.getUser();
  //     })
  //     .catch(this.handleError);
  //
  // }

  logoutFacebook(): void {
    // FB.logout(function (response) {
    //   // Person is now logged out
    // });
  }
  //
  // getPortfolio() {
  //   debugger;
  //   let anonId = localStorage.getItem('anonId')
  //   let domain = '//localhost:3000'
  //   const headers = new Headers({'Authorization': 'Authorization: Bearer ' + localStorage.accessToken});
  //   debugger;
  //   // if (anonId) {
  //   return this.http.get(domain + '/api/stock/account', {headers: headers})
  //     .map((response: Response) => {
  //         debugger;
  //         let user = response.json().obj;
  //         localStorage.setItem('anonId', user.anonId);
  //         user.portfolio.strategies = [];
  //         user.portfolio.buyCollars = [];
  //         user.portfolio.sellCollars = [];
  //         user.portfolio.collars.forEach((collar) => {
  //           if (collar.sellOrder) {
  //             user.portfolio.sellCollars.push(collar)
  //           } else if (collar.buyOrder) {
  //             user.portfolio.buyCollars.push(collar)
  //           } else {
  //             user.portfolio.strategies.push(collar)
  //           }
  //         })
  //         return user;
  //       }
  //     )
  //     .catch((error: Response) => {
  //
  //       return Observable.throw(error.json());
  //     });
  // }

  // /**
  //  * This is a convenience method for the sake of this example project.
  //  * Do not use this in production, it's better to handle errors separately.
  //  * @param error
  //  */
  // private handleError(error) {
  //   console.error('Error processing action', error);
  // }
}
