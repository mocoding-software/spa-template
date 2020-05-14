using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Mocoding.AspNetCore.Spa;

namespace spa_template
{

  public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvcCore()
                .AddJsonOptions(options =>
                {                    
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(null, false));
                })
                .AddSwaggerSpecification()
                .AddDataAnnotations()
                .AddDataAnnotationsLocalization();

            services
                .AddResponseCompression()                
                .AddAppInsightsTelemetry(Configuration)
                .AddWebEncoders()
                .AddSpaRenderer(options =>
                    {
                        options.BabelPolyfill =
                            "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js";
                    });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseResponseCompression();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFilesWithCache();

            app.Map("/api", apiApp =>
            {
                apiApp
                    .UseRouting()
                    .UseSwagger(options => options.RouteTemplate = "${documentName}")                    
                    .UseEndpoints(endpoints =>
                    {
                        endpoints.MapControllers();
                    });
            });

            app.UseReactSpa(env);
        }
    }
}
