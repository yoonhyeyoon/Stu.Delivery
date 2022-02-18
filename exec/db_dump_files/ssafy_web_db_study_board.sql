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
-- Table structure for table `study_board`
--

DROP TABLE IF EXISTS `study_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_board` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_id` bigint DEFAULT NULL,
  `writer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj7ya01qm3idvyo6wwo2mhi9m3` (`study_id`),
  KEY `FK5tiuqitnypo9g6ryn17hvd3pn` (`writer_id`),
  CONSTRAINT `FK5tiuqitnypo9g6ryn17hvd3pn` FOREIGN KEY (`writer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKj7ya01qm3idvyo6wwo2mhi9m3` FOREIGN KEY (`study_id`) REFERENCES `study` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_board`
--

LOCK TABLES `study_board` WRITE;
/*!40000 ALTER TABLE `study_board` DISABLE KEYS */;
INSERT INTO `study_board` VALUES (1,'안녕하세요!','2022-02-18 10:28:18.864000','공지사항',5,10),(2,'오늘은 백준 17144번 - 미세먼지 안녕! 문제를 풀도록 하겠습니다','2022-02-18 10:47:51.403000','오늘의 문제',1,3);
/*!40000 ALTER TABLE `study_board` ENABLE KEYS */;
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
