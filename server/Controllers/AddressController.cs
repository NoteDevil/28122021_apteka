using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query =
                @"SELECT id_address, name_address, data_work, data_end FROM public.address;";
            DataTable table = new DataTable();
            string sqlDataSource =
                _configuration.GetConnectionString("EmployeeAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon)
                )
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load (myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Address add)
        {
            string query =
                @"INSERT INTO public.address(name_address, data_work, data_end) VALUES ('" +
                add.name_address +
                @"', '" +
                add.data_work +
                @"', '" +
                add.data_end +
                @"');";
            string sqlDataSource =
                _configuration.GetConnectionString("EmployeeAppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon)
                )
                {
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Address add)
        {
            string query =
                @"
                        update public.address set
                        department_name = '" +
                add.name_address +
                @"',
                        data_work = '" +
                add.data_work +
                @"',
                        data_end = '" +
                add.data_end +
                @"'
                        where department_id = " +
                add.id_address +
                @"
                        ";
            string sqlDataSource =
                _configuration.GetConnectionString("EmployeeAppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon)
                )
                {
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query =
                @"
                        delete from public.address
                        where id_address = " +
                id +
                @"
                        ";
            string sqlDataSource =
                _configuration.GetConnectionString("EmployeeAppCon");
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon)
                )
                {
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
