CREATE DATABASE main_db;
USE main_db;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema plataforma5
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NULL,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(255) NULL,
  `role` VARCHAR(20) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

LOCK TABLES `User` WRITE;
INSERT INTO `User` (id,userName,firstName,lastName,email,password,role)
values
(1,'Pepe','Jose','Perez','pepe@jose.com','12345678','admin');

INSERT INTO `User` (id,userName,firstName,lastName,email,password,role)
values
(6,'Pancho','Jose','Perez','pepe@jose.com','12345678','user');

UNLOCK TABLES; 

CREATE TABLE IF NOT EXISTS `Cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL ,
  `estado` ENUM('activo','cerrado'),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES User(`id`) ON UPDATE CASCADE)
ENGINE = InnoDB;

 LOCK TABLES `Cart` WRITE;
INSERT INTO `Cart` (id,userId,estado)
values
(1,1,'activo');

INSERT INTO `Cart` (id,userId,estado)
values
(2,1,'cerrado');

INSERT INTO `Cart` (id,userId,estado)
values
(3,1,'cerrado');

UNLOCK TABLES; 

CREATE TABLE IF NOT EXISTS `Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `cantidad` INT NULL,
  `descripcion` VARCHAR(100) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

 LOCK TABLES `Product` WRITE;
INSERT INTO `Product` (id,categoria,nombre,cantidad,descripcion)
values
(1,'Perfumeria','Axe',2,'Desodorante');
INSERT INTO `Product` (id,categoria,nombre,cantidad,descripcion)
values
(2,'Perfumeria','Dove',1,'Desodorante');
INSERT INTO `Product` (id,categoria,nombre,cantidad,descripcion)
values
(3,'Alamcen','Playadito',1,'Yerba Mate');

UNLOCK TABLES; 

CREATE TABLE IF NOT EXISTS `CartProduct` (
  `cartId` INT NOT NULL,
  `productId` INT NOT NULL,
  FOREIGN KEY (`cartId`) REFERENCES Cart(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES Product(`id`))
ENGINE = InnoDB;

 LOCK TABLES `CartProduct` WRITE;
INSERT INTO `CartProduct` (cartId,productId)
values
(1,1);

UNLOCK TABLES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

