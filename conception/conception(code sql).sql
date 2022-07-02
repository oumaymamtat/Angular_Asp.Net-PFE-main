-- MySQL Script generated by MySQL Workbench
-- Sun May 17 05:28:26 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Thyroid
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Thyroid` ;

-- -----------------------------------------------------
-- Schema Thyroid
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Thyroid` DEFAULT CHARACTER SET utf8 ;
USE `Thyroid` ;

-- -----------------------------------------------------
-- Table `Thyroid`.`Patient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Thyroid`.`Patient` ;

CREATE TABLE IF NOT EXISTS `Thyroid`.`Patient` (
  `IdPatient` INT NOT NULL AUTO_INCREMENT,
  `CodePatient` INT NULL,
  `FirstNamePatient` VARCHAR(45) NULL,
  `MidennamePatient` VARCHAR(45) NULL,
  `LastNamePatient` VARCHAR(45) NULL,
  `DateOfBirth` DATE NULL,
  `PhonePatient` VARCHAR(45) NULL,
  `AdressPatient` VARCHAR(45) NULL,
  `CityPatient` VARCHAR(45) NULL,
  `CountryPatient` VARCHAR(45) NULL,
  `SexPatient` VARCHAR(45) NULL,
  PRIMARY KEY (`IdPatient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Thyroid`.`Study`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Thyroid`.`Study` ;

CREATE TABLE IF NOT EXISTS `Thyroid`.`Study` (
  `IdStudy` INT NOT NULL AUTO_INCREMENT,
  `IdPatient` INT NULL,
  `IdRadiologist` INT NULL,
  `TypeofStudy` VARCHAR(45) NULL,
  `DateStudy` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`IdStudy`),
  INDEX `fk_patient_study_idx` (`IdPatient` ASC),
  CONSTRAINT `fk_patient_study`
    FOREIGN KEY (`IdPatient`)
    REFERENCES `Thyroid`.`Patient` (`IdPatient`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Thyroid`.`StudyThyroid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Thyroid`.`StudyThyroid` ;

CREATE TABLE IF NOT EXISTS `Thyroid`.`StudyThyroid` (
  `IdStudyThyroid` INT NOT NULL AUTO_INCREMENT,
  `IdStudyCompare` INT NULL,
  `NodulePresence` TINYINT NULL,
  `NumberOfNodules` INT NULL,
  `Volume` VARCHAR(45) NULL,
  `Vascularization` VARCHAR(45) NULL,
  `Echogenicity` VARCHAR(45) NULL,
  `LymphNodeUltra` VARCHAR(45) NULL,
  `ThyroglossalTractStudy` VARCHAR(45) NULL,
  `Recommendation` VARCHAR(45) NULL,
  PRIMARY KEY (`IdStudyThyroid`),
  CONSTRAINT `fk_study_studythyroid`
    FOREIGN KEY (`IdStudyThyroid`)
    REFERENCES `Thyroid`.`Study` (`IdStudy`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Thyroid`.`Nodule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Thyroid`.`Nodule` ;

CREATE TABLE IF NOT EXISTS `Thyroid`.`Nodule` (
  `IdNodule` INT NOT NULL AUTO_INCREMENT,
  `IdStudy` INT NULL,
  `Size` VARCHAR(45) NULL,
  `Location` VARCHAR(45) NULL,
  `Shape` VARCHAR(45) NULL,
  `Margin` VARCHAR(45) NULL,
  `Echogenicity` VARCHAR(45) NULL,
  `Composition` VARCHAR(45) NULL,
  `EchogenicFoci` VARCHAR(45) NULL,
  `Calcifications` VARCHAR(45) NULL,
  `ExtraThyroidExtension` VARCHAR(45) NULL,
  `Cartography` VARCHAR(45) NULL,
  `Evolution` VARCHAR(45) NULL,
  `ScoreTIRADS` INT NULL,
  PRIMARY KEY (`IdNodule`),
  INDEX `fk-nodule-study_idx` (`IdStudy` ASC),
  CONSTRAINT `fk-nodule-study`
    FOREIGN KEY (`IdStudy`)
    REFERENCES `Thyroid`.`StudyThyroid` (`IdStudyThyroid`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;