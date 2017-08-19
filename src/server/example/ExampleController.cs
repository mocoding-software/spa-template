using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using Microsoft.AspNetCore.Mvc;

namespace spa_template.Example
{    
    [Route("server-time")]
    public class ExampleController
    {
        [HttpGet]
        public ExampleDto GetDataFromServer()
        {
            Thread.Sleep(250);
            return new ExampleDto()
            {
                Message = "Current Server Time",
                CurrentServerTime = DateTime.Now
            };
        }
    }

    public class ExampleDto
    {
        public string Message { get; set; }
        public DateTime CurrentServerTime { get; set; }
    }
}