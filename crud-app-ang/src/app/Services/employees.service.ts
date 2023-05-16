import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('https://localhost:7186' + '/api/employees');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee>{
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>('https://localhost:7186' + '/api/employees', addEmployeeRequest);
  }

  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>('https://localhost:7186' + '/api/employees/' + id);
  }

  updateEmployee(id: string, updateEmployeeRequest: Employee): Observable<Employee>{
    return this.http.put<Employee>('https://localhost:7186' + '/api/employees/' + id, updateEmployeeRequest);
  }

  deleteEmployee(id: string): Observable<Employee>{
    return this.http.delete<Employee>('https://localhost:7186' + '/api/employees/' + id);
  }
}
