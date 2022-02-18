-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6d201.p.ssafy.io    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `study_member`
--

DROP TABLE IF EXISTS `study_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKxu4jds4ab0mfyrvdxsu60iut` (`study_id`),
  KEY `FKdkjhe6vrqdbg9meu09nqdwd5e` (`user_id`),
  CONSTRAINT `FKdkjhe6vrqdbg9meu09nqdwd5e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKxu4jds4ab0mfyrvdxsu60iut` FOREIGN KEY (`study_id`) REFERENCES `study` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_member`
--

LOCK TABLES `study_member` WRITE;
/*!40000 ALTER TABLE `study_member` DISABLE KEYS */;
INSERT INTO `study_member` VALUES (1,'offline',1,2),(2,'offline',1,1),(3,'offline',1,5),(4,'offline',2,4),(5,'offline',2,6),(6,'offline',1,3),(7,'offline',3,5),(8,'offline',4,3),(9,'offline',4,2),(10,'offline',1,4),(11,'offline',5,3),(12,'offline',6,3),(13,'offline',5,5),(14,'offline',5,10),(15,'offline',7,10),(16,'offline',1,10);
/*!40000 ALTER TABLE `study_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:25:09
