﻿using CRUD_api_solution.Data;
using CRUD_api_solution.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_api_solution.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly CrudDbContext _crudDbContext;

        public EmployeesController(CrudDbContext crudDbContext)
        {
            _crudDbContext = crudDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _crudDbContext.Employees.ToListAsync();

            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _crudDbContext.Employees.AddAsync(employeeRequest);
            await _crudDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee = await _crudDbContext.Employees.FirstOrDefaultAsync( x => x.Id == id);

            if(employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {
            var employee = await _crudDbContext.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }

            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;

            await _crudDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
        {
            var employee = await _crudDbContext.Employees.FindAsync(id);

            if(employee == null)
            {
                return NotFound();
            }

            _crudDbContext.Employees.Remove(employee);
            await _crudDbContext.SaveChangesAsync();

            return Ok(employee);
        }
    }
}
