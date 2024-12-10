# FASE DE CODIFICACIÓN E PROBAS

- [FASE DE CODIFICACIÓN E PROBAS](#fase-de-codificación-e-probas)
  - [1- Codificación](#1--codificación)
  - [2- Prototipos](#2--prototipos)
  - [3- Innovación](#3--innovación)
  - [4- Probas](#4--probas)

## 1- Codificación

- [`API`](https://github.com/iriavidal/Proyecto-DAW/tree/main/API)
- [`Gestor Clínica`](https://github.com/iriavidal/Proyecto-DAW/tree/main/gestor_clinica)

## 2- Prototipos

[Figma](https://www.figma.com/design/uxAOJqyHggyEfxbHwytm41/Veterinaria?node-id=774-413&node-type=canvas&t=tfuxE9mZall5ef44-0)

## 3- Innovación

La utilización de `Angular 18` para mi proyecto fue todo un reto, que considero que he superado. El motivo de esta elección fue que era la tecnología que me enseñaron en la fct de este ciclo, y a medida que aprendía más la consideré una elección acertada por su versatilidad y su curva de aprendizaje completamente asequible si ya tienes una base de javascript.

La creación de una `API REST en PHP` también fue todo un reto. Plasmar todo el conocimiento aprendido en el ciclo de PHP en esta API ha requerido muchas horas, tutoriales y búsquedas en google, y sobretodo romperse mucho la cabeza, pero al final he superado este reto y tengo una API que me sirve para cualquier proyecto personal que la necesite, lo cual me hace sentir muy orgullosa.

## 4- Probas

> Deben describirse as probas realizadas e conclusión obtidas. Describir os problemas atopados e como foron solucionados.

Las pruebas que se describirán a continuación, pueden verse paso a paso con imágenes en los manuales de usuario. Si se precisa guía visual se recomienda su consulta en el siguiente [enlace](https://github.com/iriavidal/Proyecto-DAW/blob/main/doc/templates/5_Implantaci%C3%B3n.md#2--manual-de-usuario).

### Pruebas para el usuario cliente de la clínica

#### 1. Registrarse

A la hora de registrarse, nos encontramos un formulario con dos pasos. En el primer paso, realizamos las siguientes pruebas:

- Primero dejamos el formulario en blanco e intentamos continuar, resultado: no nos permite avanzar al siguiente paso.
- Dejamos cualquier campo en blanco e intentamos continuar, resultado: no nos permite avanzar al siguiente paso.
- Intentamos introducir un DNI falso, resultado: no nos permite avanzar al siguiente paso.
- Intentamos introducir un DNI que ya está en la base de datos, resultado: no nos permite avanzar al siguiente paso.
- Intentamos introducir un teléfono no válido, resultado: no nos permite avanzar al siguiente paso.

Una vez introducidos todos los datos del usuario de forma correcta, avanzamos al siguiente paso:

- Primero dejamos el formulario en blanco e intentamos continuar, resultado: no nos permite registrarnos.
- Dejamos cualquier campo en blanco e intentamos continuar, resultado: no nos permite registrarnos.
- Introducimos un email no válido (formato email@email), resultado: no nos permite registrarnos.
- Introducimos un email que ya esté en la base de datos, resultado: no nos permite registrarnos.
- Introducimos dos contraseñas diferentes, resultado: no nos permite registrarnos.

Una vez introducimos todos los datos de inicio de sesión de forma correcta, se habilita el botón de registrarse. Cuando le damos click al botón, obtenemos una respuesta positiva de la API, y nos redirige al formulario de login.

#### 2. Iniciar sesión

A la hora de iniciar sesión, nos encontramos con un formulario con dos campos y el botón de iniciar sesión deshabilitado.

- Primero dejamos el formulario en blanco e intentamos continuar, resultado: no nos permite iniciar sesión.
- Introducimos un email no válido (formato email@email), resultado: no nos permite iniciar sesión.
- Introducimos un email no registrado en la base de datos, resultado: no nos permite iniciar sesión.
- Introducimos una contraseña que no es la asociada a ese email, resultado: no nos permite iniciar sesión.

Una vez introducimos todos los datos de forma corrcta, se habilita el botón de iniciar sesión. Cuando le damos click al botón, obtenemos una respuesta positiva de la API, y nos redirige al menú de usuario.

#### 3. Registrar mascota

Para el registro de una mascota, se nos proporciona un formulario con varios campos y el botón de registrar mascota deshabilitado.

- Primero dejamos el formulario en blanco e intentamos continuar, resultado: no nos permite registrar a la mascota.
- El campo de fecha de nacimiento no nos permite proporcionar una fecha futura.

Una vez introducidos todos los datos de forma correcta, se habilita el botón de registrar mascota. Cuando le damos click al botón, obtenemos una respuesta positiva de la API, y nos redirige de nuevo al menú del usuario, donde se muestra un select con el nombre de la nueva mascota.

#### 4. Solicitar cita

Para la solicitud de una cita, se nos proporciona un formulario con varios pasos. Si no proporcionamos el dato del paso, no nos permite ir al siguiente.

- La fecha no puede ser la misma del día o la del anterior.
- El campo de hora no nos permite proporcionar una hora fuera del horario, ni una hora dentro del margen de 15 minutos antes y después de la hora de otra cita.
- El campo de motivo no te permite continuar si no se selecciona uno de los motivos proporcionados.

Una vez que introducimos los datos de forma correcta, nos lleva al último paso en el que se resumen los datos y se permite resetear el formulario o pedir la cita. Cuando se solicita la cita, obtenemos una respuesta positiva de la API, y se nos redirige de nuevo al menú de las citas, donde se visualiza una card con la información de la cita solicitada.

#### 5. Modificar cita

Para la modificación de las citas, se nos proporciona el mismo formulario que para la solicitud de cita, pero con los datos ya proporcionados, para su modificación.
Las pruebas, restrucciones y resultados son los mismos que en la solicitud.

#### 6. Eliminar cita

Para la eliminación de una cita, solo tenemos que presionar el botón de eliminar en la card de dicha cita. El resultado es una recarga del listado de citas, en el que ya no aparecerá la cita eliminada.

#### 7. Consultar citas de una mascota diferente

Cuando se tienen varias mascotas registradas, se puede consultar sus citas sin moverse del menú de citas.
La prueba consiste en seleccionar diferentes mascotas en el select y se observa cómo el listado de citas cambia según las citas de cada mascota.

#### 8. Consulta de historiales

Para la consulta de los historiales médicos de una mascota, se accede al menú de historiales, donde se muestra un listado de los historiales de la mascota seleccionada. Cada card tiene un botón que permite ver por completo el historial, y en él se proporciona un formulario que solo se puede leer, no modificar, con la información ampliada del historial.
La prueba consiste simplemente en la consulta correcta de los datos.

#### 9. Modificación de datos del usuario

Para la modificación de datos del usuario se proporciona un formulario ya rellenado con los datos de dicho usuario, donde solo se puede modificar el teléfono y el email.

- Introducimos un email que ya esté en la base de datos, resultado: no nos permite modificar los datos de usuario.

Una vez introducimos todos los datos de forma correcta, se habilita el botón de modificar datos del usuario. Cuando le damos click al botón, obtenemos una respuesta positiva de la API, y nos redirige al menú de usuario.

#### 10. Modificación de datos del usuario

Para la modificación de datos de la mascota se proporciona un formulario ya rellenado con los datos de dicha mascota.

Las pruebas, restricciones y resultados son los mismos que en el registro.
