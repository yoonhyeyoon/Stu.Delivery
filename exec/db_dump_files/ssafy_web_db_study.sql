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
-- Table structure for table `study`
--

DROP TABLE IF EXISTS `study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `finish_at` date DEFAULT NULL,
  `introduction` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_private` bit(1) NOT NULL,
  `link_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locker_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_user_num` int DEFAULT '8',
  `meeting_room_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_room_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_at` date DEFAULT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `master_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7mvglaixd5kqeg6k8fewrgpb6` (`master_id`),
  CONSTRAINT `FK7mvglaixd5kqeg6k8fewrgpb6` FOREIGN KEY (`master_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (1,'2022-02-17 19:04:43.746000','2022-03-25','안녕하세요~',_binary '\0','https://i6d201.p.ssafy.io/study/',NULL,6,'m_20220217100443714_L3BLY1','알고리즘 스터디 할 사람~','password','p_20220217100443714_L3BLY1','2022-02-17','/images/thumbnail/study_thu_2.png',2),(2,'2022-02-17 19:09:02.309000','2022-03-25','매주 월요일 정기모임',_binary '','https://i6d201.p.ssafy.io/study/',NULL,6,'m_20220217100902308_B7ko1R','독서토론해요','password','p_20220217100902308_B7ko1R','2022-02-17','/images/thumbnail/study_thu_1.png',6),(3,'2022-02-17 20:07:43.766000','2022-03-15','아무도 못온다~!',_binary '\0',NULL,NULL,1,'m_20220217110743731_j9JyO5','아무도 못 들어오는 스터디',NULL,'p_20220217110743731_j9JyO5','2022-02-17','/images/thumbnail/study_thu_1.png',5),(4,'2022-02-17 20:27:36.559000','2022-03-27','토이토이',_binary '\0',NULL,NULL,8,'m_20220217112736520_sayuuw','테스트123',NULL,'p_20220217112736520_sayuuw','2022-02-17','/images/thumbnail/study_thu_4.png',3),(5,'2022-02-18 00:30:18.820000','2022-03-31','취미로 그림 그립시다',_binary '\0',NULL,NULL,4,'m_20220217153018786_WC0kl1','취미로 그림 그리는 클래스',NULL,'p_20220217153018786_WC0kl1','2022-03-01','/images/thumbnail/study_thu_3.png',3),(6,'2022-02-18 00:40:24.107000','2022-02-28','왜냐면 여신(女神)과 여신(與信)은 다르기 때문이지',_binary '',NULL,NULL,8,'m_20220217154024106_zkNanj','어음과 어음은 다르다.','1q2w3e4r','p_20220217154024106_zkNanj','2022-02-21','/images/thumbnail/study_thu_1.png',3),(7,'2022-02-18 10:37:07.070000','2022-03-18','스프링 스터디 같이 할 사람 구합니다!',_binary '\0',NULL,NULL,5,'m_20220218013707061_SU12qf','스프링 스터디',NULL,'p_20220218013707061_SU12qf','2022-02-18','/images/thumbnail/study_thu_5.png',10);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
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
