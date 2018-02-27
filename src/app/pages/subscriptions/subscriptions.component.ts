import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../../@core/data/users.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ngx-subscriptions',
  styleUrls: ['./subscriptions.component.scss'],
  templateUrl: './subscriptions.component.html',
})
export class SubscriptionsComponent implements OnInit {
  user: any;
  couponCode: string;
  email: string;
  isEditEmail: boolean;

  isRocketBot: Boolean;
  isRocketEmail: Boolean;
  isBrunoEmail: Boolean;
  rocketSmsSubscription: any;
  brunoSmsSubscription: any;
  isRocketBotExtendedHours: any;

  constructor(private userService: UserService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser()
      .subscribe(data => {
        this.user = data;
        if (this.user) {
          this.isRocketBot = this.user.stripeCustomer.subscriptions.data.some(subscription => {
            return subscription.plan.id === 'rocket-bot';
          })
          this.isRocketEmail = this.user.stripeCustomer.subscriptions.data.some(subscription => {
            return subscription.plan.id === 'rocket-email';
          })
          this.isBrunoEmail = this.user.stripeCustomer.subscriptions.data.some(subscription => {
            return subscription.plan.id === 'bruno-email';
          })
          this.rocketSmsSubscription = this.user.stripeCustomer.subscriptions.data.filter(subscription => {
            return subscription.plan.id === 'rocket-sms';
          })[0]
          this.brunoSmsSubscription = this.user.stripeCustomer.subscriptions.data.filter(subscription => {
            return subscription.plan.id === 'bruno-sms';
          })[0]
          this.isRocketBotExtendedHours = this.user.stripeCustomer.subscriptions.data.filter(subscription => {
            return subscription.plan.id === 'rocket-extended';
          })[0]
          this.email = this.user.email;
        }
      });
  }


  openCheckout() {
    var userService = this.userService;
    var ref = this.ref;
     var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeCheckoutKey,
      locale: 'auto',
      token: function (token: any) {
        userService.charge(token.id)
          .subscribe(data => {
            location.reload();
          });
      }
    });

    handler.open({
      name: 'FreeStock',
      description: 'Payment Info',
      email: this.user.email,
      allowRememberMe: false,
      amount: 0,
      panelLabel: 'Setup'
    });
  }

  addCoupon() {
    this.userService.addCoupon(this.couponCode)
      .subscribe(data => {
          location.reload();
        },
        error => {
          alert("There was a problem with the coupon.")
        }
      );
  }

  toggleEditEmail() {
    if (this.isEditEmail) {
      this.isEditEmail = false;
    } else {
      this.isEditEmail = true;
    }
  }

  changeEmail() {
    this.userService.changeEmail(this.email)
      .subscribe(data => {
          this.user = data.obj;
        },
        error => {

        }
      );
    this.isEditEmail = false;
  }

}
