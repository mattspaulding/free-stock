import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-bot-profile',
  styleUrls: ['./bot-profile.component.scss'],
  templateUrl: './bot-profile.component.html',
})
export class BotProfileComponent {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() pictureUrl: string;
  @Input() type: string;
  @Input() description: string;

}
