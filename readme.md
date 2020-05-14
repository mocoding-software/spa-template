# .NET Core / React / Redux / TypeScript - Starter Boilerplate
Comprehensive boilerplate aimed to speed up development of new projects.

## Justification
Every time we start new project it takes some time to bootstrap initial configuration, gather all dependencies, configure HMR, SSR etc. Sometimes libraries are not working well together and it requires additional time to troubleshoot and find workaround or even correct version of the lib. And once this sweet spot is found we want to repeat it from project to project.

## Solution
Develop a template with common configuration in place and creating a new project will take minimal effort. Go with convention-over-configuration so best practices are applied automatically.

## About V2
This template was originally created in 2017 and used cutting edge technologies at that time - .NET Core, React, Typescript, Webpack, Docker. As time passes and more projects added - common parts of the template were separated into it's own libraries that we call **Mocoding Stack**:
- [Mocoding.AspNetCore.Spa](https://github.com/mocoding-software/aspnetcore-spa) - SPA Middleware and SSR
- [@mocoding/react-app](https://github.com/mocoding-software/react-app) - build system for React Application
- [dotnet-node-docker](https://github.com/mocoding-software/dotnet-node-docker) - base Docker images

At this time there is no plans to go beyond that. Template is considered complete and powers a set of production websites with low to medium load. There will be minor updates primarily for the libraries used in the template but not in its structure. So enjoy!

## Main Features

- [.NET Core](https://www.microsoft.com/net/core) - cross-platform development platform. With our addition of [Mocoding.AspNetCore.Spa](https://github.com/mocoding-software/aspnetcore-spa) it makes easy to bootstrap single page application with Server Side Rendering, Hot Module Replacement, application settings, environment management and streamlined deployment workflow. Easily extensible to provide REST API. 

- [TypeScript](https://www.typescriptlang.org/) - a JavaScript for C# developers. A typed superset of JavaScript that allows writing type-safe code and find most problems at compile-time. Types, Generics, Arrow Functions, Classes and Interfaces, Async/Await, Modules, Iterators, Generators, Decorators and many more!

- [React](https://github.com/facebook/react) - fast, component-based and versatile library to build beautiful UI. Combining with TypeScript it provides a mind-blowing experience with intellisense and compile-time type checking.

- [Redux](https://github.com/reactjs/redux) - application state management for React. Allows breaking down the business logic into set of simple pure functions that are easy to test, modify and extend.

- [@mocoding/react-app](https://github.com/mocoding-software/react-app) - advanced and very complex solution for bundling and minification of client and server side files. Allows React and Typescript to play nicely together and reduces enormous amount of boilerplate code.

- [Bootstrap 4](https://v4-alpha.getbootstrap.com) - UI framework chosen by default for template. The big advantage over other frameworks is easy customization and availability of custom themes and components.

- [Swagger](https://swagger.io/) + [Swashbuckle](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) + [NSwag](https://github.com/RSuter/NSwag) - allows easy integration between server and client. Server exposes auto-generated REST API specification in Swagger format. Client auto-generates client library to consume REST API.

- [Docker](https://www.docker.com/) - container platform that allows developer to create distributable image with application packed into it. As a result: easy deployment to any host and support of continuous integration and continuous deployment out of the box.

- [Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) - useful extension for Visual Studio Code that allows easily replicate development environment.

### Bonus

- [redux-automata](https://github.com/mocoding-software/redux-automata) - allows managing application state by deterministic finite automaton. Allows developer to use Declarative way of writing Redux reducers.

## Libraries
Below is the list of server side and client side libraries with comments and justifications.

___

## Folder Structure 

```cs
/
+- src                // all source code 
    +- app              // client application
    |   +- api            // api integrations
    |   +- components     // reusable UI components
    |   +- pages          // app pages
    |   +- store          // Redux store files        
    +- server           // .NET and TS server files

```

## Application Structure Guidelines

* Application folder contains both C# and TS(TSX) files. To avoid mess it assumed that .NET Core files should be only in `src/server` folder. 

* .NET Core is responsible to provide hosting solution for static files, API and server pre-render for client files. It is recommended to keep custom API code in separate projects and include them as a reference to the main project.

* Application specific code lives in ```src/app``` and is built using [@mocoding/react-app](https://github.com/mocoding-software/react-app) that uses one of the bootstrap modules and split application between server and client. That results in two folders created: `wwwroot` and `wwwroot_node` to keep client and server files.

* [Mocoding.AspNetCore.Spa](https://github.com/mocoding-software/aspnetcore-spa) takes care of serving static files and adds specific SPA middleware to render application on any url that is not an API call.

## Getting Started

1. Running  the application
```sh
yarn
dotnet restore
dotnet run
```

This will run code in Program.cs which bootstraps web hosting passing it ```Startup``` class. Website is available on ```http://localhost:5000```.

