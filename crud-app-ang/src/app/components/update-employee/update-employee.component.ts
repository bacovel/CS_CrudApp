import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.module';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit{

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(private route: ActivatedRoute, private service: EmployeesService, private router: Router) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.service.getEmployee(id).subscribe({
            next: (response) =>{
              this.employeeDetails = response;
            },
            error: (response) => {
              console.log(response);
            }
          });
        }
      }
    });
  }

  updateEmployee(){
    this.service.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: (response) => {
        this.router.navigate(["employee"]);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deleteEmployee(id: string){
    this.service.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate(["employee"]);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

}
