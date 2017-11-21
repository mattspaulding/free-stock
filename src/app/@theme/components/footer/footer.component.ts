import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><b>FreeStock</b>.market 2017</span>
    <div class="socials">
      <a href="https://www.facebook.com/FreeStockMarket" target="_blank" class="ion ion-social-facebook"></a>
    </div>
  `,
})
export class FooterComponent {
}
