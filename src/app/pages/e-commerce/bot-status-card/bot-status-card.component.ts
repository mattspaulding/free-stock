import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-bot-status-card',
  styleUrls: ['./bot-status-card.component.scss'],
  template: `
    <nb-card [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <img src="{{pictureUrl}}">
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ACTIVE' : 'COMING SOON' }}</div>
      </div>
    </nb-card>
  `,
})
export class BotStatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() pictureUrl: string;
}
