import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

// For angular form
// FormGroup - Control our all form (Hanle form input)
// FormControl - What inside form controller (input fields etc)
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// For dialog box referenece
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // Course array list
  courseList = [ {id:0,name:''} ]

  // Form declare
  studentForm !: FormGroup;

  // Edit student data or Add new record ?
  isEdit : boolean = false;

  // Dialog submit butoon name
  submitButton : string = "Add Student";

  /// Without injecting
  // studentForm = new FormGroup({
  //   firstName : new FormControl,
  //   lastName  : new FormControl
  // });

  // Inject api services (Connection with json server)
  // Inject formgroup using constructor
  // Inject MatDialogRef <The model that data comming from> (To close form on success)
  // Inject MAT_DIALOG_DATA to pass data to component
  // Inject app component
  constructor(private api : ApiService,
              private formBuilder : FormBuilder,
              private dialogRef : MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public studentData : any,
              private app : AppComponent) { }

  /// <Summery>
  /// Get list of course from database for dropDown
  /// <Summery>
  /// <return>
  /// Return list of courses
  /// </return>
  getCourseList(){
    this.api.getAllCourse()
    .subscribe({
      next : (res) => {
        this.courseList = res
      },
      error:() =>{
        this.app.erorrSnackBar('Error Loading !');
        this.dialogRef.close('error');
      }
    })
  }

  /// <Summery>
  /// Check add or update
  /// <Summery>
  /// <return></return>
  submitStudentData(){
    if(!this.isEdit){
      this.addStudent();
    }
    else if(this.isEdit){
      this.updateStudent();
    }
  }

  /// <Summery>
  /// Add a student to database (Id auto increment)
  /// <Summery>
  /// <return></return>
  addStudent(){
    if(this.studentForm.valid){
      this.api.addStudent(this.studentForm.value)
      .subscribe({
        next : (res) => {
          this.app.successSnackBar("Student added sucessfully.")
          this.studentForm.reset();
          this.dialogRef.close();
        },
        error:() =>{
          this.app.erorrSnackBar('Error Loading !');
          this.dialogRef.close('error');
        }
      })
    }
  }

  /// <Summery>
  /// Update studednt by pk
  /// <Summery>
  /// <return></return>
  updateStudent(){
    if(this.studentForm.valid){
      this.api.updateStudent(this.studentForm.value, this.studentData.id)
      .subscribe({
        next : (res) => {
          this.app.successSnackBar("Student updated sucessfully.")
          this.studentForm.reset();
          this.dialogRef.close();
        },
        error:() =>{
          this.app.erorrSnackBar('Error Loading !');
          this.dialogRef.close('error');
        }
      })
    }
  }

  ngOnInit(): void {

    this.getCourseList();

    this.isEdit = false;

    this.studentForm = this.formBuilder.group({
        firstName : ['', Validators.required],
        lastName  : ['', Validators.required],
        dob       : ['', Validators.required],
        course    : ['', Validators.required],
        email     : ['', [Validators.email, Validators.required]],
    });

    //Set data coming from table
    //Patch the data
    if(this.studentData){

      this.studentForm.controls['firstName'].setValue(this.studentData.firstName);
      this.studentForm.controls['lastName'].setValue(this.studentData.lastName);
      this.studentForm.controls['dob'].setValue(this.studentData.dob);
      this.studentForm.controls['course'].setValue(this.studentData.course);
      this.studentForm.controls['email'].setValue(this.studentData.email);

      this.isEdit = true;
      this.submitButton = "Update"
    }
  }

}
