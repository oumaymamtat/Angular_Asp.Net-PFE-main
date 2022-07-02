import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model';
import { EditEmpComponent } from 'src/app/employee/edit-emp/edit-emp.component';
import { AddEmpComponent } from 'src/app/employee/add-emp/add-emp.component';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})

export class ShowEmpComponent implements OnInit {

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['Options','EmployeeID','EmployeeName','Department','MailID','DOJ'];
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private service:EmployeeService,
    private dialog:MatDialog) {
   this.service.listen().subscribe((m:any)=>{
      console.log("listen");
      console.log(m);
      this.refreshEmpList();
    })
   }

 
 ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data => {
       this.listData = new MatTableDataSource(data);
    this.listData.sort = this.sort;

    });   
  }
  
    onDelete(id:number){
    console.log("Employee with id: "+id+" has been deleted successfully!");
    if(confirm('Are you sure to delete?,')){
    this.service.deleteEmployee(id).subscribe(res=>{
      this.refreshEmpList();
      
    })
  }
  }

  onEdit(Emp : Employee){
    this.service.formData = Emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(EditEmpComponent,dialogConfig);

  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(AddEmpComponent,dialogConfig);
  }  
}