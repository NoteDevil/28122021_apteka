using System;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IWebHostEnvironment _env;

        public EmployeeController(
            IConfiguration configuration,
            IWebHostEnvironment env
        )
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query =
                @"SELECT id_product, id_address, available, other, photo_file_name FROM public.product;";
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
        public JsonResult Post(Product prod)
        {
            string query =
                @"
                    INSERT INTO public.product(id_address, available, other, photo_file_name)
                    VALUES 
                    (
                    '" +
                prod.id_address +
                @"'
                    ,'" +
                prod.available +
                @"'
                    ,'" +
                prod.other +
                @"'
                    ,'" +
                prod.photo_file_name +
                @"'
                    )
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
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Product emp)
        {
            string query =
                @"
                    UPDATE public.product SET 
                    id_address = '" +
                emp.id_address +
                @"'
                    ,available = '" +
                emp.available +
                @"'
                    ,other = '" +
                emp.other +
                @"'
                    where id_product = " +
                emp.id_poduct +
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
                    delete public.address
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

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;
                using (
                    var stream = new FileStream(physicalPath, FileMode.Create)
                )
                {
                    postedFile.CopyTo (stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query =
                @"
                    select name_address from public.address
                    ";
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
    }
}
