# FASE DE IMPLANTACIÓN

- [FASE DE IMPLANTACIÓN](#fase-de-implantación)
  - [1- Manual técnico](#1--manual-técnico)
    - [1.1- Instalación](#11--instalación)
    - [1.2- Administración do sistema](#12--administración-do-sistema)
  - [2- Manual de usuario](#2--manual-de-usuario)
  - [3- Melloras futuras](#3--melloras-futuras)

## 1- Manual técnico

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

![Pantalla principal](/img/manual_usuario/1.1.jpg)

1.2. Escogemos la opción de registrarse

![Menú registro](/img/manual_usuario/1.2.jpg)

1.3. Rellenar los datos solicitados

![Datos del usuario](/img/manual_usuario/1.3.1.jpg)
![Datos de inicio de sesión](/img/manual_usuario/1.3.2.jpg)

`NOTA`: todos los datos son obligatorios excepto la dirección.

1.4. Iniciar sesión con los datos registrados

![Iniciar sesión](/img/manual_usuario/1.4.jpg)

#### 2. Registrar una mascota

2.1. Dentro del menú del usuario, escogemos la opción de añadir una nueva mascota

![Añadir nueva mascota](/img/manual_usuario/2.1.jpg)

2.2. Rellenar los datos de la mascota

![Datos de la nueva mascota](/img/manual_usuario/2.2.jpg)

#### 3. Solicitar una cita

3.1. Acceder al menú de citas, donde podemos consultar las citas pendientes

![Acceder al menú de citas](/img/manual_usuario/3.1.jpg)

3.2. Escogemos la opción de añadir una nueva cita

![Añadir nueva cita](/img/manual_usuario/3.2.jpg)

3.3. Escoger fecha (no se permiten fines de semana), hora (no se permiten horas fuera del horario ni horas de menos de 15 minutos antes o después de otra cita) y motivo de la cita

![Fecha](/img/manual_usuario/3.3.1.jpg)
![Hora](/img/manual_usuario/3.3.2.jpg)
![Motivo](/img/manual_usuario/3.3.3.jpg)
![Finalizar](/img/manual_usuario/3.3.4.jpg)

3.4. Consultar citas

![Citas pendientes](/img/manual_usuario/3.4.jpg)

#### 4. Consultar historiales

4.1. Acceder al menú de historiales, después de que hayas tenido una cita

![Acceder al menú de historiales](/img/manual_usuario/4.1.jpg)

4.2. Acceder a una vista más amplia del historial

![Acceder a vista más amplia del historial](/img/manual_usuario/4.2.jpg)

4.3. Visualizar historial completo
![Historial completo](/img/manual_usuario/4.3.jpg)

#### 5. Editar datos propios y de mascotas

5.1. Acceder al menú de editar datos

![Acceder al menú de editar datos](/img/manual_usuario/5.1.jpg)

5.2. Esocger qué datos queremos editar

![Escoger entre datos usuario y datos mascota](/img/manual_usuario/5.2.jpg)

5.3. Editar los datos deseados

![Datos usuario](/img/manual_usuario/5.3.1.jpg)

En el usuario solo se pueden modificar la dirección y el email.

![Datos mascota](/img/manual_usuario/5.3.2.jpg)

También se puede eliminar la mascota, lo cual eliminará también de la base de datos sus citas e historiales.

## 3- Melloras futuras

> _EXPLICACIÓN:_ Neste apartado incluiranse as posibilidades de mellora da aplicación no futuro.
