import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(public dialogbox : MatDialogRef<EditEmpComponent>, public service:EmployeeService) { }
  public listItems:Array<string>=[];

  ngOnInit(): void {
    this.dropdownRefresh();
  }
  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data=>{
      console.log(data);
      data.forEach(element => {
        this.listItems.push(element["departmentName"]);
      });
    })
  }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.service.updateEmployee(form.value).subscribe(res=>
      {
        alert(res);
      })
  }
}
