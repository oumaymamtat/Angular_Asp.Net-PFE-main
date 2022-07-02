import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AddDepComponent} from 'src/app/department/add-dep/add-dep.component';
import { EditDepComponent } from '../edit-dep/edit-dep.component';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:DepartmentService,private dialog:MatDialog) {
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshDepList();
    })
   }

 listData : MatTableDataSource<any>;
 displayedColumns : string[] = ['Options','DepartmentID','DepartmentName'];
 @ViewChild(MatSort) sort: MatSort;

 ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){
  /*  var dummyData = [{departmentID:1,departmentName:"IT"},
    {departmentID:2,departmentName:"Finance"}];
    this.listData = new MatTableDataSource(dummyData); */
    this.service.getDepList().subscribe(data => {
       this.listData = new MatTableDataSource(data);
    this.listData.sort = this.sort;

    });   
  }
  
  onEdit(dep : Department){
    console.log(dep); console.log(" has been edited successfully!");
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(EditDepComponent,dialogConfig);

  }
  onDelete(id:number){
    console.log("Department with id: "+id+" has been deleted successfully!");
    if(confirm('Are you sure to delete?,')){
    this.service.deleteDepartment(id).subscribe(res=>{
      this.refreshDepList();
      
    })
  }
  }
  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(AddDepComponent,dialogConfig);
  }
}