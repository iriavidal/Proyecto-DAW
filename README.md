# Proxecto fin de ciclo

- [Proxecto fin de ciclo](#proxecto-fin-de-ciclo)
  - [Taboleiro do proyecto](#taboleiro-do-proyecto)
  - [Descrición](#descrición)
  - [Instalación / Posta en marcha](#instalación--posta-en-marcha)
  - [Uso](#uso)
  - [Sobre o autor](#sobre-o-autor)
  - [Licenza](#licenza)
  - [Índice](#índice)
  - [Guía de contribución](#guía-de-contribución)
  - [Links](#links)

## Taboleiro do proyecto

Este proyecto se encuentra en una fase de desarrollo temprana.

## Descrición

El proyecto es una **plataforma integral para clínicas veterinarias** que unifica la gestión interna y la comunicación externa, facilitando tanto la captación de clientes como la administración diaria de citas e historiales médicos. Diseñado para mejorar la experiencia del cliente y optimizar el trabajo del veterinario, el software ofrece dos interfaces:

1. **Para los clientes**: Una web atractiva que los invita a elegir la clínica por su imagen profesional y facilidad de uso, permitiéndoles gestionar citas e información clínica de sus mascotas de forma intuitiva.

2. **Para los veterinarios**: Un sistema centralizado para organizar citas y consultar o actualizar historiales médicos, simplificando su trabajo diario y permitiéndoles brindar un mejor servicio.

Este proyecto utilizará Angular en su versión más reciente y una API propia en PHP.

## Instalación / Posta en marcha

### Web clínica:

#### 1. Clonar el Repositorio

Usa el comando `git clone` con la URL del repositorio:

```bash
git clone https://github.com/iriavidal/Proyecto-DAW.git
```

Luego, entra en la carpeta del proyecto:

```bash
cd Proyecto-DAW/gestor_clinica
```

#### 2. Instalar dependencias

Ejecuta `npm install` para instalar las dependencias necesarias:

```bash
npm i
```

#### 3. Iniciar el proyecto

Inicia el servidor de desarrollo con `ng serve` (si dispones de Angular CLI) o con `npm start`:

```bash
npm start
```

Esto levantará el servidor en `http://localhost:4200` de forma predeterminada, donde podrás acceder al proyecto de forma local.

`NOTA`: estas instrucciones asumen que el usuario que quiera realizar una prueba local en vez de visitar la web tiene instalado en su ordenador la última versión de **Node.js**. Si no es el caso, [aquí tienes el link para descargarlo](https://nodejs.org/en/).

### API:

#### 1. Acceso a la carpeta

Una vez clonado el repositorio en el paso anterior, se accede a la carpeta de la API:

```bash
cd Proyecto-DAW/API
```

#### 2. Instalar dependencias

Ejecuta `composer install` para instalar las dependencias necesarias:

```bash
composer i
```

#### 3. Iniciar el proyecto

```bash
php -S localhost:8081
```

`NOTA`: estas instrucciones asumen que el usuario que quiera realizar una prueba local en vez de visitar la web tiene instalado en su ordenador la última versión de **Composer**. Si no es el caso, [aquí tienes el link para descargarlo](https://getcomposer.org/download/).

### Base de datos:

#### 1. Importar base de datos a XAMPP:

Dentro de la carpeta `Proyecto-DAW/API`, podremos encontrar un archivo sql llamado `bbdd`, que está completamente preparado para simplemente importarlo en `http://localhost/phpmyadmin`.

`NOTA`: estas instrucciones asumen que el usuario que quiera realizar una prueba local en vez de visitar la web tiene instalado en su ordenador la última versión de **XAMPP**. Si no es el caso, [aquí tienes el link para descargarlo](https://www.apachefriends.org/es/download.html).

## Uso

Como veterinario podrás gestionar tus citas y consultar los historiales de tus pacientes.

Como usuario de la clínica, podrás tener perfiles para tus mascotas donde consultarás sus historiales médicos y gestionarás sus citas con total comodidad y sencillez.

## Sobre o autor

Mi nombre es Iria Vidal y soy una estudiante en su último año de desarrollo de aplicaciones web.
Mi fuerte es el front-end, dominando con soltura HTML y CSS, y reforzando día a día mis conocimientos de Javascript y Angular.

También tengo conocimientos de back-end, más concretamente en PHP, Java y conocimientos de gestión de bases de datos SQL.

Mi motivación para realizar este proyecto es facilitar el día a día tanto de las clínicas veterinarias como de sus pacientes, algo que como usuaria siento necesario y me encantaría poder tener.

Contacto: iriavidal96@gmail.com

## Licenza

Este proyecto está licenciado bajo la `GNU Free Documentation License Version 1.3`. Esto implica que el código es de libre distribución, modificación y uso, siempre que se mantenga esta misma licencia para las obras derivadas. De este modo, se facilita la colaboración y continuidad del proyecto por parte de terceros, asegurando que los desarrollos futuros sigan las mismas normas de software libre.

Para más detalles, consulta el archivo `LICENSE` incluido en la raíz del repositorio, donde se especifican los términos completos de esta licencia.

## Índice

> _EXPLICACIÓN_: Simplemente indexa ordenadamente todo o tey proxecto.

1. [Anteproyecto](doc/templates/1_Anteproxecto.md)
2. [Análise](doc/templates/2_Analise.md)
3. [Deseño](doc/templates/3_Deseño.md)
4. [Codificación e probas](doc/templates/4_Codificacion_e_probas.md)
5. [Implantación](doc/templates/5_Implantación.md)
6. [Referencias](doc/templates/6_Referencias.md)
7. [Incidencias](doc/templates/7_Incidencias.md)

## Guía de contribución

- **Nuevas funcionalidades**: tanto la exposición de nuevas ideas como su implementación siempre serán bienvenidas.
- **Pruebas y reportes de bugs**: se agradece la contribución y reporte de cualquier fallo que pueda presentar el software.
