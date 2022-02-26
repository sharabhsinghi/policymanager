import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AddPolicyComponent } from '../add-policy/add-policy.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, component: '' },
          { title: 'Card 2', cols: 1, rows: 1, component: '' },
          { title: 'Card 3', cols: 1, rows: 1, component: 'my-policies' }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1, component: '' },
        { title: 'Card 2', cols: 1, rows: 1, component: '' },
        { title: 'Card 3', cols: 2, rows: 1, component: 'my-policies' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}

  addPolicyPopup(): void {
    const dialogRef = this.dialog.open(AddPolicyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let isAdded = result;
    });
  }
}
