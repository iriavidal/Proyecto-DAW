-- Creación de la base de datos
CREATE DATABASE gestion_clinica;
USE gestion_clinica;

-- Tabla Rol
CREATE TABLE Rol (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombreRol VARCHAR(50) UNIQUE
);

-- Insertar roles iniciales
INSERT INTO Rol (nombreRol) VALUES ('cliente'), ('veterinario'), ('tecnico');

-- Tabla Usuario genérica
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    username VARCHAR(10)  NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    idRol INT,
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
);

-- Tabla Cliente (relacionada con Usuario)
CREATE TABLE Cliente (
    idCliente INT PRIMARY KEY,
    idUsuario INT,
    dni VARCHAR(15) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

-- Tabla TipoMascota para almacenar los tipos de mascotas
CREATE TABLE TipoMascota (
    idTipo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE
);

-- Insertar tipos iniciales
INSERT INTO TipoMascota (nombre) VALUES ('perro'), ('gato'), ('pájaro'), ('reptil'), ('pez');

-- Tabla Mascotas
CREATE TABLE Mascotas (
    idMascota INT PRIMARY KEY,
    idUsuario INT,
    idTipo INT,
    nombre INT NOT NULL,
    fecha_nac DATE,
    nChip VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    FOREIGN KEY (idUsuario) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idTipo) REFERENCES TipoMascota(idTipo)
);

-- Tabla Historiales
CREATE TABLE Historiales (
    idHistorial INT PRIMARY KEY,
    idMascota INT,
    urlArchivo VARCHAR(255),
    fecha_y_hora DATETIME,
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota) ON DELETE CASCADE
);

-- Tabla Citas
CREATE TABLE Citas (
    idCita INT PRIMARY KEY,
    idMascota INT,
    idVeterinario INT,
    fecha_y_hora DATETIME,
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota),
    FOREIGN KEY (idVeterinario) REFERENCES Usuario(idUsuario)
);
