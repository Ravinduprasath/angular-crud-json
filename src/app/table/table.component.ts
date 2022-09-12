import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

// Material Table
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AppComponent } from '../app.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  // Columns need to display in table
  displayedColumns: string[] = ['firstName', 'lastName', 'dob' ,'course', 'email', 'action'];
  
  // Table data sourse
  dataSource !: MatTableDataSource<any>;
  
  // Delete snackbar position
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Inject Api services
  // Inject mat dialog
  // Inject app component
  // Inject mat snackbar
  constructor(private api : ApiService, 
              private dialog : MatDialog,
              private app : AppComponent,
              private snackBar : MatSnackBar) { }

  /// <Summery>
  /// Get list of course from database for dropDown
  /// <Summery>
  /// <return>
  /// Return list of courses
  /// </return>
  getStudentList(){
   // this.app.openSnackBar('Work')
    this.api.getAllStudents()
    .subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error : (res) => {
        this.app.erorrSnackBar('Can not display students !')
      }
    })
  }

  /// <Summery>
  /// Open add student modal
  /// Refresh table after modal close
  /// <Summery>
  /// <return> </return> 
  editStudenDetails(data : any){
    this.dialog.open(DialogComponent, {
      maxWidth : '350px',
      data     : data
    }).afterClosed().subscribe(val => {
      this.getStudentList();
    });
  }

  /// <Summery>
  /// Ask confirmation before delete a record
  /// <Summery>
  deleteSnackBar(id : number) {
    let snackBarRef = this.snackBar.open('Do you want to delte this ?', 'Confirm',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000, // In mileseconds,
      panelClass: ['mat-toolbar', 'mat-warn']
    })

    snackBarRef.onAction().subscribe(() => {
        this.deleteStudent(id);
    });
  }

  /// <Summery>
  /// Delete student from database by id
  /// Refresh table after delete
  /// <Summery>
  /// <return> </return> 
  deleteStudent(data : number){
    this.api.deleteStudent(data)
    .subscribe({
      next : (res) => {
        this.getStudentList();
        this.app.successSnackBar('Successfully deleted.')
      },
      error : (res) => {
        this.app.erorrSnackBar('Can not display students !')
      }
    })
  }

  /// <Summery>
  /// Calculate age based on birthday
  /// <Summery>
  /// <return>
  /// Return age
  /// </return>
  calculateAge(dob : Date){
    let birthDate = new Date(dob)
    let timeDiff = Math.abs(Date.now() - birthDate.getTime() );
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  ngOnInit(): void {
    this.getStudentList();
  }

}
