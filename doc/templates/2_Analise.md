# Requerimientos do sistema

- [Requerimientos do sistema](#requerimientos-do-sistema)
  - [1- Descrición Xeral](#1--descrición-xeral)
  - [2- Funcionalidades](#2--funcionalidades)
  - [3- Tipos de usuarios](#3--tipos-de-usuarios)
  - [4- Contorno operacional](#4--contorno-operacional)
  - [5- Normativa](#5--normativa)
  - [6- Melloras futuras](#6--melloras-futuras)

> _EXPLICACION_: Este documento describe os requirimentos para "nome do proxecto" especificando que funcionalidade ofrecerá e de que xeito.

## 1- Descrición Xeral

> _EXPLICACION_: Descrición Xeral do proxecto

Este proyecto consiste en la creación de una plataforma web para la gestión de citas y el seguimiento médico de mascotas en clínicas veterinarias.

La base de la plataforma web será Angular, que unirá el front-end con el back-end. El front consistirá en HTML y CSS (utilizando el framework de Sass) y back en una API que almacenará una base de datos en MariaDB, que se creará con el framework Slim, en PHP.

## 2- Funcionalidades

> _EXPLICACION_ Describir que servizos ou operacións se van poder realizar por medio do noso proxecto, indicando que actores interveñen en cada caso.
>
> Enumeradas, de maneira que na fase de deseño poidamos definir o diagrama ou configuración correspondente a cada funcionalidade.
> Cada función ten uns datos de entrada e uns datos de saída. Entre os datos de entrada e de saída, realízase un proceso, que debe ser explicado.

Exemplo:

| Acción                     | Descrición                                   |
| -------------------------- | -------------------------------------------- |
| Alta de productos          | Dar de alta os productos na base de datos    |
| Modificar productos        | Modificación de productos na base de datos   |
| Presentación dos productos | Mostra dos productos por medio da páxina web |

| Acción                                                     | Descrición                                                                              |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Alta de usuarios/mascotas/historiales/citas/veterinarios   | Dar de alta nuevos usuarios/mascotas/historiales/citas/veterinarios en la base de datos |
| Modificar usuarios/mascotas/historiales/citas/veterinarios | Modificación de usuarios/mascotas/historiales/citas/veterinarios en la base de datos    |
| Eliminar usuarios/mascotas/historiales/citas/veterinarios  | Eliminación de usuarios/mascotas/historiales/citas/veterinarios en la base de datos     |
| Mostrar usuarios/mascotas/historiales/citas/veterinarios   | Presentación de usuarios/mascotas/historiales/citas/veterinarios por medio de la web    |

## 3- Tipos de usuarios

> _EXPLICACION_ Describir os tipos de usuario que poderán acceder ao noso sistema. Habitualmente os tipos de usuario veñen definidos polas funcionalidades ás cales teñen acceso. En termos xerais existen moitos grupos de usuarios: anónimos, novos, rexistrados, bloqueados, confirmados, verificados, administradores, etc.
>
> Exemplo:
>
> - Usuario xenérico, que terá acceso a ...
> - Usuario técnico, que poderá...

- Usuario **registrado**, tendrá acceso al home y al menú donde podrá registrar sus mascotas, pedirles cita y ver toda su información.
- Usuario **administrador**, serán los profesionales veterinarios de la clínica, que tendrán acceso al home y a un menú especial para ellos en el que verás las citas que tienen en el día y la información de sus pacientes. Podrán añadir historiales médicos a los perfiles de las mascotas.
- Usuario **técnico**, tendrá acceso a todo para poder solucionar posibles fallos e implementar nuevas actualizaciones y servicios.

Los usuarios técnicos serán los que den el alta a los veterinarios a petición de las clínicas. Los usurios registrados podrán registrarse ellos mismos. Los administrares podrán añadir y eliminar solo historiales médicos, y visualizar todas las citas de la clínica. Los registrados podrán ver crear, modificar y eliminar sus propias citas.

## 4- Contorno operacional

> _EXPLICACION_ Neste apartado deben describirse os recursos necesarios, dende o punto de vista do usuario, para poder operar coa aplicación web. Habitualmente consiste nun navegador web actualizado e unha conexión a internet.
> Se é necesario algún hardware ou software adicional, deberá indicarse.

El usuario solo necesitará un navegador web actualizado, por ejemplo Google Chrome, y una conexión a internet. Podrá acceder tanto desde el ordenador como desde el móvil.

## 5- Normativa

> _EXPLICACION_ Investigarase que normativa vixente afecta ao desenvolvemento do proxecto e de que maneira. O proxecto debe adaptarse ás esixencias legais dos territorios onde vai operar.
>
> Pola natureza dos sistema de información, unha lei que se vai a ter que mencionar de forma obrigatoria é la [Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD)](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673). O ámbito da LOPDPGDD é nacional. Se a aplicación está pensada para operar a nivel europeo, tamén se debe facer referencia á [General Data Protection Regulation (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Na documentación debe afirmarse que o proxecto cumpre coa normativa vixente.
>
> Para cumplir a LOPDPGDD e/ou GDPR debe ter un apartado na web onde se indique quen é a persoa responsable do tratamento dos datos e para que fins se van utilizar. Habitualmente esta información estructúrase nos seguintes apartados:
>
> - Aviso legal.
> - Política de privacidade.
> - Política de cookies.
>
> É acosenllable ver [exemplos de webs](https://www.spotify.com/es/legal/privacy-policy/) que conteñan textos legais referenciando a LOPDPGDD ou GDPR.

El ámbito de la web al principio será autonómico, más concretamente en Galicia. Se espera que en un futuro escale a nivel nacional, pero no entra en los planes a futuro operar a nivel europeo.

Las leyes a cumplir son:

1. **Ley Orgánica 3/2018 de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDPGDD)**: tiene como objetivo garantizar la protección de los datos personales y los derechos digitales en España.
2. **Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI)**: esta ley regula el comercio electrónico y los servicios prestados por internet en España. Se aplica en caso de que una página web preste servicios de forma online, como la gestión de citas, incluso si no se realizan transacciones económicas directamente a través de la web.

La clínica veterinaria sería la responsable del tratamiento de los datos personales de los usuarios que se registren o interactúen en su web, ya que son ellos los que estarán recogiendo, gestionando y utilizando los datos personales de los clientes (dueños de mascotas, por ejemplo) para ofrecer sus servicios (como la gestión de citas). Mi papel como desarrolladora sería el de un encargado del tratamiento, o sea que proporcionaría un servicio a la clínica y trataría los datos en su nombre.

Para cumplir con la normativa de protección de datos, se firmará un contrato de encargo de tratamiento con la clínica.

A continuación se expone un ejemplo de cómo se verá reflejada la normativa en la web:

### Aviso Legal

En cumplimiento con la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos del responsable de esta página web:

- **Nombre**: _Clínica Veterinaria XYZ_
- **CIF**: _XXXXXXXXXX_
- **Dirección**: _Calle Ejemplo 123, 28000, Ciudad, Provincia_
- **Correo Electrónico**: *contacto@veterinariaxyz.com*
- **Teléfono**: _+34 600 000 000_

### Política de Privacidad

De acuerdo con lo establecido en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDPGDD) se informa a los usuarios de esta página web sobre el tratamiento de sus datos personales.

**Responsable del Tratamiento**

La _clínica veterinaria XYZ_ es la responsable del tratamiento de los datos personales recabados a través de este sitio web.

**Finalidad del Tratamiento**  
Los datos personales que se recopilen en este sitio web se utilizarán para gestionar citas en clínicas veterinarias. Estos datos serán tratados de manera confidencial y se utilizarán únicamente con fines operativos y comerciales relacionados con el servicio.

**Legitimación**  
El tratamiento de los datos personales está basado en el consentimiento del usuario, el cual se otorga en el momento de proporcionar los datos para utilizar los servicios del sitio.

**Derechos de los Usuarios**  
Los usuarios tienen derecho a acceder, rectificar, eliminar, oponerse y limitar el tratamiento de sus datos, así como a la portabilidad de los mismos. Para ejercer estos derechos, pueden enviar una solicitud por correo electrónico a *contacto@veterinariaxyz.com* o mediante correo postal a _Calle Ejemplo 123, 28000, Ciudad, Provincia_.

**Periodo de Conservación de los Datos**  
Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recopilaron y para cumplir con las obligaciones legales.

**Cesión de Datos**  
Los datos personales no se cederán a terceros, salvo obligación legal.

### Política de Cookies

Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del usuario y ofrecer servicios personalizados. Al navegar o utilizar nuestros servicios, el usuario acepta el uso de cookies bajo las condiciones expuestas en esta Política.

**¿Qué son las Cookies?**  
Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al navegar por internet. Éstas permiten, entre otras cosas, recordar las preferencias del usuario o analizar su comportamiento en la web.

**Tipos de Cookies Utilizadas**

- **Cookies técnicas**: son necesarias para el funcionamiento básico del sitio web. Permiten la navegación y el uso de las diferentes opciones o servicios que ofrece la web.
- **Cookies de personalización**: almacenan las preferencias del usuario para ofrecer una experiencia adaptada a sus necesidades (idioma, región, etc.).
- **Cookies de análisis**: utilizadas para medir y analizar la actividad del usuario en el sitio web y mejorar su funcionamiento.

**Desactivar o Eliminar Cookies**  
El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de las opciones del navegador. En los siguientes enlaces encontrará información sobre cómo realizar esta gestión en los navegadores más comunes:

- [Chrome](https://support.google.com/chrome/answer/95647?hl=es)
- [Firefox](https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-)
- [Safari](https://support.apple.com/es-es/guide/safari/sfri11471/mac)
- [Edge](https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-0407-4a8e-8af0-96d6b7b172eb)

## 6- Melloras futuras

> _EXPLICACION_ É posible que o noso proxecto se centre en resolver un problema concreto que se poderá ampliar no futuro con novas funcionalidades, novas interfaces, etc.

La idea del proyecto es cumplir las necesidades que cada clínica tenga a demanda. El software base gestionará citas e historiales, pero en un futuro la clínica que lo desee podrá también tener una tienda online o un blog.
