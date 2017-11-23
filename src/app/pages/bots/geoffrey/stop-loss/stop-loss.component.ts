import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-stop-loss',
  styleUrls: ['./stop-loss.component.scss'],
  templateUrl: './stop-loss.component.html',
})
export class StopLossComponent implements OnDestroy {

  stopLoss = 10;
  stopLossOff = false;
  stopLossMode = 'cool';

  // humidity = 87;
  // humidityOff = false;
  // humidityMode = 'heat';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
