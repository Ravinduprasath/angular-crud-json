import { Component, Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition  } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Refresh child component
  @ViewChild(TableComponent) table!: TableComponent;

  // Snackbar positions
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Inject mat dialog
  // Inject mat snackbar
  constructor(private dialog : MatDialog, 
              private snackBar : MatSnackBar) { }  

  /// <Summery>
  /// Common popup messege Success
  /// <Summery>
  successSnackBar(msg : string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000, // In mileseconds,
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }

  /// <Summery>
  /// Common popup messege error
  /// <Summery>
  erorrSnackBar(msg : string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1 * 1000, // In mileseconds,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  /// <Summery>
  /// Open add student modal
  /// Refresh table after modal close
  /// <Summery>
  /// <return> </return> 
  openDialog(){
    this.dialog.open(DialogComponent, {
      maxWidth: '350px'
    }).afterClosed().subscribe(val => {
      if(val != 'error'){
        this.table.getStudentList();
      }
    });
  }
}
