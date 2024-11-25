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
    ("tecnico", CURDATE(), CURDATE());

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
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
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
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_tipo) REFERENCES TiposMascota(id_tipo)
);

-- Tabla Historiales
CREATE TABLE Historiales (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_mascota INT,
    urlArchivo VARCHAR(255),
    fecha_y_hora DATETIME,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota) ON DELETE CASCADE
);

-- Tabla Citas
CREATE TABLE Citas (
    id_cita INT PRIMARY KEY AUTO_INCREMENT,
    id_mascota INT,
    id_veterinario INT,
    fecha_y_hora DATETIME,
    date_create DATE DEFAULT CURDATE(),
    date_update DATE DEFAULT CURDATE(),
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota),
    FOREIGN KEY (id_veterinario) REFERENCES Usuarios(id_usuario)
);

INSERT INTO Usuarios (nombre_usuario, apellidos_usuario, password_usuario, email_usuario, dni_usuario, direccion_usuario, id_rol, date_create, date_update) 
VALUES 
    ('Juan', 'Pérez García', 'password123', 'juan.perez@email.com', '12345678A', 'Calle Falsa 123', 1, CURDATE(), CURDATE()), 
    ('Ana', 'López Martínez', 'password456', 'ana.lopez@email.com', '98765432B', 'Calle Real 456', 2, CURDATE(), CURDATE());

INSERT INTO Mascotas (id_usuario, id_tipo, nombre_mascota, fecha_nac_mascota, nChip_mascota, raza_mascota, date_create, date_update) 
VALUES 
    (1, 1, 'Rex', '2020-05-10', '123456789012', 'Labrador', CURDATE(), CURDATE()),
    (2, 2, 'Miau', '2021-08-15', '987654321098', 'Siamés', CURDATE(), CURDATE());

INSERT INTO Historiales (id_mascota, urlArchivo, fecha_y_hora, date_create, date_update) 
VALUES 
    (1, 'https://example.com/historiales/rex.pdf', '2023-11-23 10:00:00', CURDATE(), CURDATE()), 
    (2, 'https://example.com/historiales/miau.pdf', '2023-11-22 15:30:00', CURDATE(), CURDATE());

INSERT INTO Citas (id_mascota, id_veterinario, fecha_y_hora, date_create, date_update) 
VALUES 
    (1, 2, '2023-11-25 09:00:00', CURDATE(), CURDATE()), 
    (2, 1, '2023-11-26 14:30:00', CURDATE(), CURDATE());
