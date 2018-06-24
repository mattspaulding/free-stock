import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'ngx-overview',
  styleUrls: ['./overview.component.scss'],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    window.FB.XFBML.parse();
    }
}
