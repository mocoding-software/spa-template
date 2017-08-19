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
using Swashbuckle.AspNetCore.Swagger;

namespace spa_template
{
    public static class Swagger
    {
        public static IServiceCollection AddSwaggerSpecification(this IServiceCollection services)
        {
            return services
                .AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("spec", new Info { Title = "Example Api", Version = "v1" });
                    options.DescribeAllEnumsAsStrings();
                });
        }

        public static IApplicationBuilder UseSwaggerUIAndSpec(this IApplicationBuilder app)
        {
            return app
                .UseSwagger(options => options.RouteTemplate = "${documentName}")
                .UseSwaggerUI(options =>
                {
                    options.RoutePrefix = "_swagger-ui";
                    options.SwaggerEndpoint("/api/$spec", "Example Api");
                });
        }
    }
}
