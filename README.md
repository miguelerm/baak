# Baak

**Baak** es un proyecto que utilizo como base para muchos de los desarrollos
a los que doy inicio desde cero, la idea principal es que sirva de ejemplo para
otros desarrolladores que quieren iniciar un proyecto con [Angular 2][Angular2]
([TypeScript][TypeScript]) y [Asp.Net Web Api][WebApi] ([C#][CSharp]);
adicionalmente en este proyecto trato de crear servicios autónomos para cada
módulo (ejemplificando así lo que muchos podrían llamar [Microservicios][Microservicios]
o algunos otros llamarían [SOA][SOA] debido a la ambigüedad que existe en la
misma definición de este último).

> **baak**: significa *hueso*, en maya yucateco.

## Problemas que Baak trata de resolver

Antes que nada cabe mencionar, que todo lo implementado en este proyecto es
puramente una opinion personal y no pretende ser una ley o afirmación que
establece que esta sea la única (o la mejor) forma de hacer las cosas,
simplemente es la forma (y las herramientas) que me ha funcionado en el
transcurso de mi carrera. Habiendo aclarado esto, continuemos.

* **Desarrollo y publicación independientes:**
* **Implementación escalable:**
* **Tolerancia a fallos:**
* **Alto rendimiento:**

## Otras herramientas utilizadas

Aparte de *Angular 2* y *Asp.Net WebApi* en el proyecto se utilizan librerías:

* **[Identity Server 3][IdSrv3]**: como servidor de *autenticación*.
* **[Mass Transit][MassTransit]**: como bus *de servicios*.
* **[RabbitMq][RabbitMq]**: como *message broker* para darle soporte al bus de
  servicios.
* **[MySQL][MySQL]**: como servidor de *base de datos* relacional.
* **[Dapper][Dapper]**: para acceso a datos en operaciones que requieren bajos
  tiempos de respuesta.
* **[Entity Framework][EF]**: para acceso a datos.
* **[Exceptionless][Exceptionless]**: como herramienta de registro de errores y
  logs.
* **[xUnit](https://xunit.github.io/)**.
* **[LibLog](https://github.com/damianh/LibLog)**.
* **[Serilog](https://serilog.net/)**.

> *Identity Server* implementa [OpenId][OpenId] para la identificación de los
> usuarios y [OAuth 2.0][OAuth2] para otorgar acceso a las [APIs REST][Conceptos-REST]
> de los diferentes servicios.

## Como iniciar

### Prerequisitos

> **TODO:** colocar la lista de programas necesarios para compilar y ejecutar.

### Clonar

```sh
git clone https://github.com/miguelerm/baak.git
```

### Compilar

Para el proceso de compilación se utiliza [Cake][Cake], por lo que bastará
ejecutar desde PowerShell el siguiente comando (ubicados en la carpeta del
repositorio):

```sh
.\build.ps1
```

Esto compilará la solución de Visual Studio y tambien el proyecto de Angular 2
colocando todos los ejecutables en la carpeta `bin`.

### Ejecutar

> **TODO:** colocar instrucciones para arrancar todos los componentes del sistema.


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