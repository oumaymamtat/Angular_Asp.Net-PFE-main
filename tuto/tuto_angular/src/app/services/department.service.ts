import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable,Subject} from 'rxjs';

import {Department} from 'src/app/models/department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  formData : Department;
  readonly APIUrl ="https://localhost:44324/api";

  getDepList(): Observable<Department[]>{
    return this.http.get<Department[]>(this.APIUrl +'/Department');
  }

  addDepartment(dep:Department){
    return this.http.post(this.APIUrl +'/Department/Create',dep);
  }

  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy : string){
    this._listeners.next(filterBy);
  }
  deleteDepartment(id:number){
    return this.http.delete(this.APIUrl +'/Department/Delete/'+id);
  }
  updateDepartment(dep:Department){
    return this.http.put(this.APIUrl +'/Department/Edit/',dep);
  }


}
 
