import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import {environment} from 'environments/environment';
import {Router} from "@angular/router";

const counter = 0;

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

  constructor(private http: Http, private fb: FacebookService, private router: Router) {
    console.log('Initializing Facebook');

    fb.init({
      appId: environment.fbAppId,
      version: 'v2.9',
    });
  }

  goToLogin() {
    this.router.navigate(["auth/login"]);
  }

  /**
   * Login with additional permissions/options
   */
  login() {
     const loginOptions: LoginOptions = {
      auth_type: 'rerequest',
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email',
    };

    return this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        if (res.authResponse.grantedScopes.includes('email')) {
          localStorage.accessToken = res.authResponse.accessToken;
          // this.router.navigate([""]);
          // location.reload()
          return res;
        } else {
          this.login();
        }
      })
      .catch((err) => {
        //alert('problem logging in:'+err)
        return;
      });

  }

  getLoginStatus() {
    return this.fb.getLoginStatus()
      .then(res => {
        console.log('login status: ' + res.status);
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
        if (res.email) {
          console.log('Got the users profile', res);
          return res;
        } else {
          this.login();
        }
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * logout
   */
  logout() {
    // return this.fb.logout().then((res) => {
    //   console.log('Logged out!');
    //   return res;
    // });
    debugger;
    if (localStorage.accessToken) {
      localStorage.removeItem('accessToken');
      this.router.navigate(["auth/logout"]);
      location.reload();
    }
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

  getUser() {
    if (localStorage.accessToken) {

      const headers = new Headers({'Authorization': 'Authorization: Bearer ' + localStorage.accessToken});

      return this.http.get(environment.apiBaseUrl + '/api/stock/user', {headers: headers})
        .map((response: Response) => {
          const user = response.json().obj;
          localStorage.setItem('anonId', user.anonId);
          return user;
        })
        .catch((error: Response) => {
          // this.errorService.handleError(error.json());
          localStorage.removeItem('accessToken');

         // alert(error.json().title)

          return Observable.throw(error.json());
        });
    } else {
      return Observable.of(null);
    }
  }

  getUserUpdated() {
    if (localStorage.accessToken) {

      const headers = new Headers({'Authorization': 'Authorization: Bearer ' + localStorage.accessToken});

      return this.http.get(environment.apiBaseUrl + '/api/stock/userupdated', {headers: headers})
        .map((response: Response) => {
          const user = response.json().obj;
          localStorage.setItem('anonId', user.anonId);
          return user;
        })
        .catch((error: Response) => {
          // this.errorService.handleError(error.json());
          //localStorage.removeItem('accessToken');
          return Observable.throw(error.json());
        });
    } else {
      return Observable.of(null);
    }
  }

  charge(stripeToken) {
    const body = JSON.stringify({'stripeToken': stripeToken});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization: Bearer ' + localStorage.accessToken
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/charge/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  addCoupon(couponCode) {
    const body = JSON.stringify({'couponCode': couponCode});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization: Bearer ' + localStorage.accessToken
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/addcoupon/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  addPhone(phone) {
    const body = JSON.stringify({'phone': phone});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization: Bearer ' + localStorage.accessToken
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/addphone/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  changeEmail(email) {
    const body = JSON.stringify({'email': email});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization: Bearer ' + localStorage.accessToken
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/changeemail/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  addEmailToRocketList(email) {
    const body = JSON.stringify({'email': email});
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/addemailtorocketlist/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  addEmailToBrunoList(email) {
    const body = JSON.stringify({'email': email});
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    return this.http.post(environment.apiBaseUrl + '/api/stock/addemailtobrunolist/', body, {headers: headers})
      .map((response: any) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }


}
