//ng g s services/api
//HttpClientModule

//json-server --watch db.json

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Inject http client
  constructor(private http: HttpClient) { }

  //Get any type of data to url
  getAllCourse(){
    return this.http.get<any>("http://localhost:3000/courses/");
  }

  //Post any type of data to url
  addStudent(data : any){
    return this.http.post<any>("http://localhost:3000/students/", data);
  }

  //Get any type of data to url
  getAllStudents(){
    return this.http.get<any>("http://localhost:3000/students/");
  }

  //Update any type of data to url and id
  updateStudent(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/students/" + id, data);
  }

  //Delete a product by id
  deleteStudent(id : number){
    return this.http.delete<any>("http://localhost:3000/students/" + id);
  }
}
