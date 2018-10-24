import { Component } from '@angular/core';
import {NgWebworkerService} from 'ng-webworker-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'WebWorkerExample';

  constructor(private webworkerService: NgWebworkerService) {
    this.webworkerService.execute('test', 10000).subscribe(console.log);
    this.webworkerService.execute('cpu', 10000).subscribe(console.log);

    this.webworkerService.executeFunction((t) => {
      return t * 10;
    }, 100).subscribe(console.log);

  }
}
