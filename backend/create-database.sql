DROP DATABASE IF EXISTS `karaoke_assistant`;
CREATE DATABASE `karaoke_assistant`;

USE `karaoke_assistant`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `vocal_ranges` (
  `vocal_range_id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`vocal_range_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `vocal_ranges` VALUES (1,'Bass');
INSERT INTO `vocal_ranges` VALUES (2,'Baritone');
INSERT INTO `vocal_ranges` VALUES (3,'Tenor');
INSERT INTO `vocal_ranges` VALUES (4,'Alto');
INSERT INTO `vocal_ranges` VALUES (5,'Mezzo-Soprano');
INSERT INTO `vocal_ranges` VALUES (6,'Soprano');

CREATE TABLE `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `languages` VALUES (1,'English');

-- DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `artist_id` int NOT NULL,
  `language_id` int NOT NULL,
  `vocal_range_id` tinyint NOT NULL,
  `release_year` year NOT NULL,
  PRIMARY KEY (`song_id`),
  KEY `FK_artist_id` (`artist_id`),
  KEY `FK_language_id` (`language_id`),
  KEY `FK_vocal_range_id` (`vocal_range_id`),
  CONSTRAINT `FK_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_vocal_range_id` FOREIGN KEY (`vocal_range_id`) REFERENCES `vocal_ranges` (`vocal_range_id`),
  CONSTRAINT `FK_language_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;