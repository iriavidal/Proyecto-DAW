-- Creación de la base de datos
CREATE DATABASE gestion_clinica;
USE gestion_clinica;

-- Tabla Rol
CREATE TABLE Rol (
    idRol INT PRIMARY KEY AUTO_INCREMENT,
    nombreRol VARCHAR(50) UNIQUE NOT NULL
);

-- Insertar roles iniciales
INSERT INTO Rol (nombreRol) VALUES ('cliente'), ('veterinario'), ('tecnico');

-- Tabla Usuario genérica
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(15) NOT NULL,
    idRol INT NOT NULL,
    FOREIGN KEY (idRol) REFERENCES Rol(idRol)
);

-- Tabla TipoMascota para almacenar los tipos de mascotas
CREATE TABLE TipoMascota (
    idTipo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Insertar tipos iniciales
INSERT INTO TipoMascota (nombre) VALUES ('perro'), ('gato'), ('pájaro'), ('reptil'), ('pez');

-- Tabla Mascotas
CREATE TABLE Mascotas (
    idMascota INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idTipo INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    fecha_nac DATE,
    nChip VARCHAR(50),
    raza VARCHAR(50),
    FOREIGN KEY (idUsuario) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idTipo) REFERENCES TipoMascota(idTipo)
);

-- Tabla Historiales
CREATE TABLE Historiales (
    idHistorial INT PRIMARY KEY AUTO_INCREMENT,
    idMascota INT NOT NULL,
    urlArchivo VARCHAR(255) NOT NULL,
    fecha_y_hora DATETIME NOT NULL,
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota) ON DELETE CASCADE
);

-- Tabla Citas
CREATE TABLE Citas (
    idCita INT PRIMARY KEY AUTO_INCREMENT,
    idMascota INT NOT NULL,
    idVeterinario INT NOT NULL,
    fecha_y_hora DATETIME NOT NULL,
    FOREIGN KEY (idMascota) REFERENCES Mascotas(idMascota),
    FOREIGN KEY (idVeterinario) REFERENCES Usuario(idUsuario)
);
