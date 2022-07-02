using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data.SqlClient;
using System.Data;
using ASPCoreAPI.Models.Department;

namespace ASPCoreAPI.Controllers
{
    public class DepartmentController : Controller
    {
        DepartmentDataAccessLayer objDepartment = new DepartmentDataAccessLayer();

        [HttpGet]
        [Route("api/Department")]
        public IEnumerable<Department> Index()
        {
            return objDepartment.GetAllDepartments();
        }
        
        [HttpPost]
        [Route("api/Department/Create")]
        public int Create([FromBody] Department Department)
        {
            return objDepartment.AddDepartment(Department);
        }

        [HttpGet]
        [Route("api/Department/Details/{id}")]
        public Department Details(int id)
        {
            return objDepartment.GetDepartmentData(id);
        }

        [HttpPut]
        [Route("api/Department/Edit")]
        public int Edit([FromBody]Department Department)
        {
            return objDepartment.UpdateDepartment(Department);
        }

        [HttpDelete]
        [Route("api/Department/Delete/{id}")]
        public int Delete(int id)
        {
            return objDepartment.DeleteDepartment(id);
        }
    }
}