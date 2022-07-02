using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;


namespace ASPCoreAPI.Models.Department
{
    public class DepartmentDataAccessLayer
    {
        string connectionString = "Data Source=LAPTOP-AL8QNUHO;Initial Catalog=TestDB;Integrated Security=True";

        //To View all Departments details  
        public IEnumerable<Department> GetAllDepartments()
        {
           try
            {
                List<Department> lstDepartment = new List<Department>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllDepartments", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Department Department = new Department();

                        Department.DepartmentID = Convert.ToInt32(rdr["DepartmentID"]);
                        Department.DepartmentName = rdr["DepartmentName"].ToString();
                       
                        lstDepartment.Add(Department);
                    }
                    con.Close();
                }
                return lstDepartment;
            }
            catch
            {
                throw;
            }
        }

        //To Add new Department record   
        public int AddDepartment(Department Department)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddDepartment", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DepartmentName", Department.DepartmentName);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar Department  
        public int UpdateDepartment(Department Department)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateDepartment", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DepId", Department.DepartmentID);
                    cmd.Parameters.AddWithValue("@Name", Department.DepartmentName);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular Department  
        public Department GetDepartmentData(int id)
        {
            try
            {
                Department Department = new Department();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM Departments WHERE DepartmentID= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Department.DepartmentID = Convert.ToInt32(rdr["DepartmentID"]);
                        Department.DepartmentName = rdr["DepartmentName"].ToString();
                    }
                }
                return Department;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular Department  
        public int DeleteDepartment(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteDepartment", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DepId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}