# .NET Core / React / Redux / TypeScript - Starter Boilerplate
Comprehensive boilerplate aimed to speed up development of new projects.

> WORK ON THIS TEMPLATE IS STILL IN PROGRESS

## Justification
Every time we start new project it takes some time to bootstrap initial configuration, gather all dependencies, configure HMR, SSR etc. Sometimes libraries are not working well together and it requires additional time to troubleshoot and find workaround or even correct version of the lib. And once this sweet spot is found we want to repeat it from project to project.

## Solution
Develop a template with common configuration in place and creating a new project will take minimal effort. Go with convention-over-configuration so best practices are applied automatically.

## Main Features

- [.NET Core](https://www.microsoft.com/net/core) - cross-platform development platform. With recent addition of [SPA Services](https://github.com/aspnet/JavaScriptServices) it makes easy to bootstrap single page application with Server Side Rendering, Hot Module Replacement, application settings, environment management and streamlined deployment workflow. Easely extensible to provide REST API. 

- [TypeScript](https://www.typescriptlang.org/) - a JavaScript for C# developers. A typed super set of JavaScript that allows to write type-safe code and find most problems at compile-time. Types, Generics, Arrow Functions, Classes and Interfaces, Async/Await, Modules, Iterators, Generators, Decorators and many more!

- [React](https://github.com/facebook/react) - fast, component-based and versatile library to build beautiful UI. Combining with TypeScript it provides a mind-blowing experience with intellisense and compile-time type checking.

- [Redux](https://github.com/reactjs/redux) - application state management for React. Allows breaking down the business logic into set of simple pure functions that are easy to test, modify and extend.

- [Webpack](https://webpack.js.org) - advanced and very complex solution for bundling and minification of client side files (and server too). Allows React and Typescript to be compiled and bundles in single javascript file.

- [Bootstrap 4](https://v4-alpha.getbootstrap.com) - UI framework chosen by default for template. The big advantage over other frameworks is easy customization and availability of custom themes and components.

- [Swagger](https://swagger.io/) + [Swashbuckle](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) + [NSwag](https://github.com/RSuter/NSwag) - allows easy integration between server and client. Server exposes auto-generated REST API specification in Swagger format. Client auto-generates client library to consume REST API.

- [Docker](https://www.docker.com/) - container platform that allows developer to create distributable image with application packed into it. As a result: easy deployment to any host and support of continuous integration and continuous deployment out of the box.

### Bonus

- [redux-automata](https://github.com/mocoding-software/redux-automata) - allows managing application state by deterministic finite automaton. Allows developer to use Declarative way of writing Redux reducers.

## Libraries
Below is the list of server side and client side libraries with comments and justifications.

___

## Folder Structure 

```cs
/
+- build            // webpack configurations
+- src                // all source code 
    +- app              // client application
    |   +- api            // api integrations
    |   +- components     // reusable UI components
    |   +- pages          // app pages
    |   +- store          // Redux store files
    +- assets           // styles, images etc
    +- client           // client-only code to bootstrap client
    +- server           // .NET and TS server files

```

## Application Structure Guidelines

* Application folder contains both C# and TS(TSX) files. To avoid meth it assumed that .NET Core files should be only in ```src/server``` folder. 

* .NET Core is responsible to provide hosting solution for static files, API and server pre-render for client files. It is recommended to keep custom API code in separate Projects and include them as a reference to this project.

* Client side-code is shared between ```src/app```, ```src/client``` and ```src/server/pre-render```. 

* Since this application rely on server side rendering it is important to remember that any code running in ```src/app``` folder is going to be executed on server as well. If something is required to be only on client, this should be included in ```src/client``` folder.

* ```src/server/pre-render``` contains files that will be executed by .NET Core JavaScript Services to perform application pre-render.

## Execution Flow
This chapter is going to cover all important aspects of templates and is essential to understand how to extend it.

1. Running  the application
```sh
npm i
npm run build:vendors
dotnet restore
dotnet run
```

This will run code in Program.cs which bootstraps web hosting passing it ```Startup``` class. Website is available on ```http://localhost:5000```.

2. Server Side 

Server side contains the following configuration:
* Webpack-dev-middleware for Development environment only.
* Minimal ASP.NET MVC Core API configuration with JSON formatters exposed on ```/api``` endpoint
* Swagger documentation and UI hosted on ```/api/_swagger-ui```
* Default code to return pre-rendered application.

3. Pre-render
* Pre-render is done in two steps: pre-render application according to current URL, inject pre-rendered application to Html which is also rendered as static markup.
* Pre-render depends on HtmlProps class passed from server side. HtmlProps contains a list of css, js and inline javascript that should be included in result HTML.
* Use React-Helmet to fill all head-related tags during server pre-render.

4. Client-Side
* Depending on environment ```src/client/index.ts``` or ```src/client/index.dev.ts``` is going to be used as entry point. Dev file contains all code and references to Hot Module Replacement code and libraries. Such code split was introduced to avoid including HMR code in final js bundle.
* No matter which file is used ```src/client/Client.tsx``` is going to be invoked that is actually responsible to bootstrap Redux store, reuse any existing state from server and render application by ```ReactDOM.render```

5. Application
* Entry point for application is ```src/app/index.tsx``` which defines application layout and routes 