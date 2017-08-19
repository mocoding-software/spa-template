using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.AspNetCore.NodeServices;
using System.IO;
using System.Reflection;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.SpaServices.Webpack;

namespace spa_template
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddNodeServices();
            services.AddSpaPrerenderer();

            services
                .AddMvcCore()
                .AddApiExplorer()
                .AddJsonFormatters(settings => settings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            services.AddSwaggerSpecification();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ConfigFile = Path.Combine("build", "webpack.dev.js"),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }

            app.UseStaticFiles();

            app.Map("/api", apiApp =>
            {
                apiApp.UseMvc();
                apiApp.UseSwaggerUIAndSpec();

            });

            var htmlProps = new HtmlProps(env.WebRootPath);
            app.Run(async (context) =>
            {
               var accept = context.Request.Headers["Accept"].First();
               if (!accept.Contains("text/html"))
                   return;
               var spaPrerenderer = services.GetRequiredService<ISpaPrerenderer>();
               var result = await spaPrerenderer.RenderToString("./wwwroot_node/index.js", null, htmlProps);
               await context.Response.WriteAsync(result.Html);
            });
        }
    }
}
