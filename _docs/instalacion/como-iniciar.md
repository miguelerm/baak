---
title: cómo iniciar
category: Instalación
---

#### Requisitos

* [Git][Git] v2.8
* [Visual Studio 2015 Community][VS2015]: para desarrollo del back-end.
  * [GitHub extension][VSGH], recomendada.
* [Visual Studio Code][VSCode]: para desarrollo del front-end.
  * [Editor Config][EditorConfig] plugin.
* [Node Js][NodeJs] v6.3.1

> En el caso de **git** y **node** se asume que están en el `PATH` para poder
> ejecutar los comandos sin problemas desde el cmd o powershell desde cualquier
> directorio. Para verificar podes ejecutar los siguientes comandos en el cmd:
>
> Verificar si git está instalado:
>
> ```sh
> git --version
> ```
>
> Verificar si node está instalado:
>
> ```sh
> node --version
> ```

#### Clonar

```sh
git clone https://github.com/miguelerm/baak.git
```

#### Compilar

Para el proceso de compilación se utiliza [Cake][Cake], por lo que bastará
ejecutar desde PowerShell el siguiente comando (ubicados en la carpeta del
repositorio):

```sh
.\build.ps1
```

Esto compilará la solución de Visual Studio y también el proyecto de Angular 2
colocando todos los ejecutables en la carpeta `bin` en la raíz del repositorio.

#### Ejecutar

Para iniciar el proyecto despues de haberlo compilado ejecutar desde PowerShell
el script `build.ps1` especificando como target `Run` de la siguiente forma:

```sh
.\build.ps1 -Target Run
```

Esto iniciará los siguientes servicios (dejerá la consola a espera de presionar
`Ctrl+C` para detener los servicios):

| Servicio      | Url                    |
|---------------|------------------------|
| Autenticación | http://localhost:50001 |
| Seguridad     | http://localhost:50002 |
| UI            | http://localhost:40000 |

Por lo tanto en este punto si ingresamos desde nuestro navegador a la dirección
http://localhost:40000 nos solicitará un usuario y una contraseña (por defecto
son usuario: **admin** password: **admin**) y nos mostrará la UI.

![UI](/docs/images/ui.png)


[Angular2]: https://angular.io/
[WebApi]: https://www.asp.net/web-api
[CSharp]: https://msdn.microsoft.com/en-us/library/kx37x362.aspx
[TypeScript]: http://www.typescriptlang.org/
[Microservicios]: http://www.martinfowler.com/articles/microservices.html
[SOA]: http://www.martinfowler.com/articles/microservices.html
[IdSrv3]: https://identityserver.github.io/Documentation/docsv2/
[RabbitMq]: https://www.rabbitmq.com/
[MassTransit]: http://masstransit-project.com/
[OpenId]: http://openid.net/get-an-openid/what-is-openid/
[OAuth2]: https://oauth.net/2/
[Conceptos-REST]: http://asiermarques.com/2013/conceptos-sobre-apis-rest/
[Cake]: http://www.cakebuild.net/
[MySQL]: https://www.mysql.com/
[Dapper]: https://github.com/StackExchange/dapper-dot-net
[EF]: https://www.asp.net/entity-framework
[Exceptionless]: https://github.com/exceptionless/Exceptionless
[VS2015]: https://www.visualstudio.com/vs/community/
[VSCode]: https://code.visualstudio.com/
[EditorConfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[NodeJs]: https://nodejs.org
[Git]: https://git-scm.com/
[VSGH]: https://visualstudio.github.com/
