import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.module';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{

  employees: Employee[] = [];
  constructor(private employeesService: EmployeesService){}
  
  ngOnInit(): void {
    this.employeesService.getAllEmmployees().subscribe({
      next: (employees) => {
        this.employees = employees
      },
      error: (response) => {
        console.log(response);
      }
    })
      
  }

}
