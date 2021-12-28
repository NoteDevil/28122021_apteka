using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using Microsoft.AspNetCore.Hosting;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LogsController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;

    public LogsController(IConfiguration configuration, IWebHostEnvironment env)
    {
      _configuration = configuration;
      _env = env;
    }

    [HttpGet]
    public JsonResult Get()
    {
      string query = @"SELECT log_date, log_text FROM public.logs;";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      NpgsqlDataReader myReader;
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
        {
          myReader = myCommand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }
    [HttpPost]
    public JsonResult Post(Logs log)
    {
      string query = @"
                    insert into employee (log_time,log_text) values 
                    (
                    '" + log.log_time + @"'
                    ,'" + log.log_text + @"'
                    )
                    ";
      string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
        {
          myCon.Close();
        }
      }
      return new JsonResult("Added Log");
    }
  }
}
