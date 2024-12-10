-- Creación de la base de datos
CREATE DATABASE gestion_clinica;
USE gestion_clinica;

-- Tabla Rol
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(50) UNIQUE,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar roles iniciales
INSERT INTO roles (rol, date_create, date_update) 
VALUES 
    ('cliente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('veterinario', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('tecnico', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tabla Usuario genérica
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    apellidos_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) UNIQUE,
    password_usuario VARCHAR(100) NOT NULL,
    token_usuario VARCHAR(255),
    token_exp_usuario INT,
    dni_usuario VARCHAR(15) NOT NULL UNIQUE,
    telefono_usuario VARCHAR(9),
    id_rol INT,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE SET NULL
);

-- Tabla TipoMascota para almacenar los tipos de mascotas
CREATE TABLE TiposMascota (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) UNIQUE,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar tipos iniciales
INSERT INTO TiposMascota (tipo, date_create, date_update) 
VALUES 
    ('perro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('gato', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Tabla Mascotas
CREATE TABLE mascotas (
    id_mascota INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_tipo INT,
    nombre_mascota VARCHAR(50) NOT NULL,
    fecha_nac_mascota DATE,
    nChip_mascota VARCHAR(50) NOT NULL UNIQUE,
    raza_mascota VARCHAR(50),
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES TiposMascota(id_tipo) ON DELETE SET NULL
);

-- Tabla Citas
CREATE TABLE citas (
    id_cita INT PRIMARY KEY AUTO_INCREMENT,
    id_mascota INT,
    tipo_cita VARCHAR(20) NOT NULL,
    fecha_y_hora DATETIME NOT NULL UNIQUE,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota) ON DELETE CASCADE
);

-- Tabla Historiales
CREATE TABLE historiales (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_cita INT UNIQUE, 
    id_mascota INT, 
    fecha_y_hora DATETIME NOT NULL,
    motivo VARCHAR(100) NOT NULL,
    anotaciones TEXT NOT NULL,
    date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cita) REFERENCES citas(id_cita) ON DELETE CASCADE, 
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota) ON DELETE CASCADE 
);

-- Usuario técnico
INSERT INTO usuarios (
    nombre_usuario, 
    apellidos_usuario, 
    email_usuario, 
    password_usuario, 
    dni_usuario, 
    telefono_usuario, 
    id_rol
)
VALUES (
    'Admin', 
    'Admin', 
    'admin@localhost', 
    "$2a$09$andsf2134examplestrineOnA2P.8uZUdMhfPA.nVIwDnX2HCi5yG", 
    '00000000A', 
    '123456789', 
    3
);
