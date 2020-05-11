using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;

namespace spa_template
{
    public static class Swagger
    {
        public static IMvcCoreBuilder AddSwaggerSpecification(this IMvcCoreBuilder mvcBuilder)
        {
            mvcBuilder.Services
                .AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("spec", new OpenApiInfo { Title = "Example Api", Version = "v1" });
                });
            return mvcBuilder.AddApiExplorer();
        }
    }
}
