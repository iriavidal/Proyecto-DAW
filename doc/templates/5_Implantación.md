# FASE DE IMPLANTACIÓN

- [FASE DE IMPLANTACIÓN](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
    - [1.2- Administración do sistema](#12--administración-do-sistema)
  - [2- Manual de usuario](#2--manual-de-usuario)
  - [3- Melloras futuras](#3--melloras-futuras)

## 1- Manual técnico

Como se indica en el archivo [README](https://github.com/iriavidal/Proyecto-DAW/blob/main/README.md#instalaci%C3%B3n--posta-en-marcha) de la carpeta principal de este proyecto, se pone a disposición de quien lo desee una máquina virtual totalmente preparada para la visualización y prueba del proyecto.

[Máquina virtual para exportar a VirtualHost](https://drive.google.com/file/d/1eEVI4Uy2GG__CywC0xEWGEnL_VFozOKp/view?usp=sharing)

```bash
usuario: iria
contraseña: abc123.
```

Al iniciar sesión en la máquina Debian 12, lo único que hay que hacer es ir a la carpeta `Documentos` y ejecutar el archivo `iniciar_proyecto.sh`, el cual es un script que iniciará tanto la API como el proyecto de Angular.

```bash
#!/bin/bash

# Pestaña 1: Iniciar servidor PHP
gnome-terminal --tab -- bash -c "cd ~/Documentos/Proyecto-DAW/API; php -S localhost:8081; exec bash"

# Pestaña 2: Iniciar proyecto con npm, cargando nvm
gnome-terminal --tab -- bash -c "source ~/.nvm/nvm.sh; cd ~/Documentos/Proyecto-DAW/gestor_clinica; npm start; exec bash"
```

### Instalación en Windows si no se utiliza la mv:

### 1.1- Instalación

- **Requirimentos de hardware**: ninguno en especial más que un ordenador con acceso a internet.
- **Software necesario**:

  - [XAMPP](https://www.apachefriends.org/es/download.html) `(NOTA: para un correcto funcionamiento de la API se debe configurar mySQL en el puerto 3307)`
  - [Visual Studio Code](https://code.visualstudio.com/download)
  - [Node.js](https://nodejs.org/en/)
  - [Composer](https://getcomposer.org/download/)
  - Un navegador web (en mi caso utilizo Google Chrome)

- **Carga inicial de datos na base de datos**: en la carpeta de la API puedes encontrar un archivo sql llamado [bbdd.sql](https://github.com/iriavidal/Proyecto-DAW/blob/main/API/bbdd.sql) que puedes simplemente importar en phpmyadmin.
- **Usuarios da aplicación**: la base de datos vendrá con un usuario técnico llamado admin@localhost (contraseña "admin") que puede gestionar la base de datos desde la web. Este usuario debe añadir los usuarios veterinarios. Los clientes se registrarán solos.

Puedes encontrar más información en el [archivo README de la carpeta principal.](https://github.com/iriavidal/Proyecto-DAW?tab=readme-ov-file#instalaci%C3%B3n--posta-en-marcha)

### 1.2- Administración do sistema

- **Gestión de usuarios**: como se menciona anteriormente, los usuarios veterinarios deben ser registrados por un usuario técnico. La base de datos, si se implementa con el archivo aportado en la carpeta API ([bbdd.sql](https://github.com/iriavidal/Proyecto-DAW/blob/main/API/bbdd.sql)), vendrá con un usuario técnico llamado admin@localhost (contraseña "admin").

## 2- Manual de usuario

### Manual de usuario cliente

#### 1. Cómo registrarse

1.1. Accedemos al menú para escoger si iniciar sesión o registrarse

![Pantalla principal](../img/manual_usuario/1.1.jpg)

1.2. Escogemos la opción de registrarse

![Menú registro](../img/manual_usuario/1.2.jpg)

1.3. Rellenar los datos solicitados

![Datos del usuario](../img/manual_usuario/1.3.1.jpg)
![Datos de inicio de sesión](../img/manual_usuario/1.3.2.jpg)

1.4. Iniciar sesión con los datos registrados

![Iniciar sesión](../img/manual_usuario/1.4.jpg)

#### 2. Registrar una mascota

2.1. Dentro del menú del usuario, escogemos la opción de añadir una nueva mascota

![Añadir nueva mascota](../img/manual_usuario/2.1.jpg)

2.2. Rellenar los datos de la mascota

![Datos de la nueva mascota](../img/manual_usuario/2.2.jpg)

#### 3. Solicitar una cita

3.1. Acceder al menú de citas, donde podemos consultar las citas pendientes

![Acceder al menú de citas](../img/manual_usuario/3.1.jpg)

3.2. Escogemos la opción de añadir una nueva cita

![Añadir nueva cita](../img/manual_usuario/3.2.jpg)

3.3. Escoger fecha (no se permiten fines de semana), hora (no se permiten horas fuera del horario ni horas de menos de 15 minutos antes o después de otra cita) y motivo de la cita

![Fecha](../img/manual_usuario/3.3.1.jpg)
![Hora](../img/manual_usuario/3.3.2.jpg)
![Motivo](../img/manual_usuario/3.3.3.jpg)
![Finalizar](../img/manual_usuario/3.3.4.jpg)

3.4. Consultar citas

![Citas pendientes](../img/manual_usuario/3.4.jpg)

#### 4. Consultar historiales

4.1. Acceder al menú de historiales, después de que hayas tenido una cita

![Acceder al menú de historiales](../img/manual_usuario/4.1.jpg)

4.2. Acceder a una vista más amplia del historial

![Acceder a vista más amplia del historial](../img/manual_usuario/4.2.jpg)

4.3. Visualizar historial completo

![Historial completo](../img/manual_usuario/4.3.jpg)

#### 5. Editar datos propios y de mascotas

5.1. Acceder al menú de editar datos

![Acceder al menú de editar datos](../img/manual_usuario/5.1.jpg)

5.2. Esocger qué datos queremos editar

![Escoger entre datos usuario y datos mascota](../img/manual_usuario/5.2.jpg)

5.3. Editar los datos deseados

![Datos usuario](../img/manual_usuario/5.3.1.jpg)

En el usuario solo se pueden modificar la dirección y el email.

![Datos mascota](../img/manual_usuario/5.3.2.jpg)

También se puede eliminar la mascota, lo cual eliminará también de la base de datos sus citas e historiales.

### Manual de usuario veterinario

#### 1. Cómo registrarse

El técnico administrador de su clínica veterinaria debe poner a su disposición un email y contraseña para que pueda iniciar sesión en su perfil profesional.

#### 2. Citas

2.1. Consultar las citas
Nada más iniciar sesión con su usuario, aparecerá en pantalla su menú de profesional, donde puede consultar sus citas, tanto las del día como las próximas, las últimas pudiendo ser filtradas por día.

![Menú citas](../img/manual_veterinario/2.1.jpg)

2.2. Consultar ficha de la mascota que va a ser atendida

![Ficha cita](../img/manual_veterinario/2.2.1.jpg)

Como se puede ver en la imagen, todas las citas, tanto del día como futuras, ofrecen la posibilidad de consultar la ficha de la mascota que va a ser atendida, la cual incluye tanto información del animal y de su dueño, como la lista de sus historiales de citas pasadas.

![Ficha mascota](../img/manual_veterinario/2.2.2.jpg)
![Ficha mascota](../img/manual_veterinario/2.2.3.jpg)

2.3. Añadir historial

![Ficha cita](../img/manual_veterinario/2.3.jpg)

Podrá añadir un historial por cita del día, en el botón señalado en la imagen. Esta opción le abrirá un formulario donde ya tiene rellenado el nombre de la mascota y la fecha en la que se está rellenando el formulario, teniendo solo que aportar el motivo de la cita y anotaciones de la misma.

![Formulario historial](../img/manual_veterinario/2.3.2jpg.jpg)

Una vez guardado, podrá comprobar qué citas ya tienen un historial completo en la propia ficha de la misma, como se muestra en la imagen a continuación.

![Ficha cita con historial rellenado](../img/manual_veterinario/2.3.3.jpg)

## 3- Melloras futuras

- La mejora más inmediata que se implantará será la de la creación de un apartado para programar recordatorios de citas, tanto en la parte del cliente como en la del veterinario.

- Otra mejora que puede implementarse, si la clínica desea mejorar su SEO, es la de añadir un blog.

- Por último, también a petición de la clínica, podría implementarse una tienda online de productos para animales.
