using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters.Internal;
using Microsoft.AspNetCore.SpaServices.Prerendering;

namespace spa_template
{
    public class SpaFallback
    {
        private readonly IHostingEnvironment _env;
        private readonly ISpaPrerenderer _spaPrerenderer;
        private readonly HtmlProps _htmlProps;

        private const string SERVER_RENDER_ROOT = "./wwwroot_node/index.js";
        public SpaFallback(IHostingEnvironment env, ISpaPrerenderer spaPrerenderer, TelemetryConfiguration config)
        {
            _env = env;
            _spaPrerenderer = spaPrerenderer;
            _htmlProps = new HtmlProps(env.WebRootPath, config.InstrumentationKey);
        }

        public Task RequestDelegate(HttpContext context)
        {
            if (context.Request.Path.Value == "/")
                return RenderHtmlPage(context); //always render root page.

            var acceptHeaders = context.Request.Headers["Accept"].FirstOrDefault();
            var hasRequiredHeader = acceptHeaders != null && acceptHeaders.Contains("text/html");
            if (hasRequiredHeader)
                return RenderHtmlPage(context);

            if (_env.IsDevelopment())
                context.Response.StatusCode = StatusCodes.Status404NotFound;

            return Task.FromResult(0);
        }

        private Task RenderHtmlPage(HttpContext context)
        {
            return _spaPrerenderer.RenderToString(SERVER_RENDER_ROOT, null, _htmlProps)
                .ContinueWith(task =>
                {
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    context.Response.ContentType = "text/html; charset=utf-8";
                    return context.Response.WriteAsync(task.Result.Html);
                });

        }
    }

    
}