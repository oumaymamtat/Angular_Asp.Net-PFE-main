import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Employee } from 'src/app/models/employee-model';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  formData : Employee;
  readonly APIUrl ="https://localhost:44324/api";

  getEmpList(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl +'/Employee');
  }

  addEmployee(emp:Employee){
    return this.http.post(this.APIUrl +'/Employee/Create',emp);
  }

  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy : string){
    this._listeners.next(filterBy);
    console.log("this is filter");
  }
  deleteEmployee(id:number){
    return this.http.delete(this.APIUrl +'/Employee/Delete/'+id);
  }
  updateEmployee(emp:Employee){
    return this.http.put(this.APIUrl +'/Employee/Edit/',emp);
  }

  getDepDropDownValues():Observable<any>{
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }


}
 
