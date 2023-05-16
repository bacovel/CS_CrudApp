using CRUD_api_solution.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_api_solution.Data
{
    public class CrudDbContext : DbContext
    {
        public CrudDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}
