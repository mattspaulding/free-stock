import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

import {SmartTableService} from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],

})
export class InvestmentsComponent implements OnChanges {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      symbol: {
        title: 'Symbol',
        type: 'string',
      },
      percentChange: {
        title: '% Change',
        type: 'string',
      },
      amountChange: {
        title: 'Change',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      bots: {
        title: 'Bots',
        type: 'html'
      },
    },
  };

  @Input() user;

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService) {
    // const data1 = this.user;
    //
    // const data = this.service.getData();
    //
    //  this.source.load(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user) {
      let buyChartData = [];
      this.user.portfolio.collars.forEach(collar => {
        buyChartData.push(collar.buyChartDatum)
      });
      this.source.load(buyChartData)
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
