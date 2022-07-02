using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreAPI.Models.Employee
{
    public class Employee
    {
        public int EmployeeID { get; set; }

        public string EmployeeName { get; set; }


        public string Department { get; set; }

        public string MailID { get; set; }

        public DateTime DOJ { get; set; }

    }
}