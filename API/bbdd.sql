-- Creación de la base de datos
CREATE DATABASE gestion_clinica;
USE gestion_clinica;

-- Tabla Rol
CREATE TABLE Roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(50) UNIQUE,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE()
);

-- Insertar roles iniciales
INSERT INTO Roles (rol, date_create, date_update) 
VALUES 
    ('cliente', CURDATE(), CURDATE()),
    ('veterinario', CURDATE(), CURDATE()),
    ('tecnico', CURDATE(), CURDATE());

-- Tabla Usuario genérica
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    apellidos_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100),
    password_usuario VARCHAR(100) NOT NULL,
    token_usuario VARCHAR(255),
    token_exp_usuario INT,
    dni_usuario VARCHAR(15) NOT NULL,
    direccion_usuario VARCHAR(255),
    id_rol INT,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol) ON DELETE SET NULL
);

-- Tabla TipoMascota para almacenar los tipos de mascotas
CREATE TABLE TiposMascota (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) UNIQUE,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE()
);

-- Insertar tipos iniciales
INSERT INTO TiposMascota (tipo, date_create, date_update) 
VALUES 
    ('perro', CURDATE(), CURDATE()),
    ('gato', CURDATE(), CURDATE());

-- Tabla Mascotas
CREATE TABLE Mascotas (
    id_mascota INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_tipo INT,
    nombre_mascota VARCHAR(50) NOT NULL,
    fecha_nac_mascota DATE,
    nChip_mascota VARCHAR(50) NOT NULL,
    raza_mascota VARCHAR(50),
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES TiposMascota(id_tipo) ON DELETE SET NULL
);


-- Tabla Citas
CREATE TABLE Citas (
    id_cita INT PRIMARY KEY AUTO_INCREMENT,
    id_mascota INT,
    tipo_cita VARCHAR(20) NOT NULL,
    fecha_y_hora DATETIME NOT NULL,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota) ON DELETE CASCADE
);

-- Tabla Historiales
CREATE TABLE Historiales (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_cita INT UNIQUE, 
    id_mascota INT, 
    fecha_y_hora DATETIME NOT NULL,
    motivo VARCHAR(50) NOT NULL,
    anotaciones TEXT NOT NULL,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_cita) REFERENCES Citas(id_cita) ON DELETE CASCADE, 
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota) ON DELETE CASCADE 
);