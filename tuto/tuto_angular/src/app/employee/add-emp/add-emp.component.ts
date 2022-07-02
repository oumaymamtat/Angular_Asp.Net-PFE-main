import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { element } from 'protractor';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox : MatDialogRef<AddEmpComponent>, public service:EmployeeService) { }
  public listItems:Array<string>=[];
  ngOnInit(): void {
    this.resetForm();
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
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={
      EmployeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ:null
    }
  }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
    console.log("after filter");

    
  }
  onSubmit(form:NgForm){
    console.log(form.value);
    this.service.addEmployee(form.value).subscribe(res=>
      {
        this.resetForm(form);
        alert(res);
      })
  }

}
