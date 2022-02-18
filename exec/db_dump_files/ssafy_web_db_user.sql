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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activated` bit(1) DEFAULT NULL,
  `auth_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth_status` bit(1) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `determination` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nick_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_study` time DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'YFCZpAvSFwwI5k5Jr7s7LBAS8ws7KYG5kcu1JB0BlXVM05sPrQ',_binary '\0','1995-12-05','2022-02-17 18:13:41.885000','','test1@gmail.com','tetete','$2a$10$adNYVN/wAYfMtPsu81ta8ujvl2nEwL1dkTlgnHyL.pLdzm4zEYs0O','','local',NULL,NULL,NULL),(2,NULL,'0oHfXivnhRld2eQMgsl7Ft6xvnVm6TMc9wA9YdUP5MCBSKLpOv',_binary '\0','1994-09-27','2022-02-17 19:03:44.575000','안녕하세요','test123@test.com','test','$2a$10$oXYfQvWg3NMQx9gicgqdluN7PeS08EF0gB/TCAXoeVGuycx/mQGPq','/images/profile/profile_blue.png','local',NULL,NULL,NULL),(3,NULL,'xGXVBnSXa6ic6gr6HTU71MKIl6VkspqbbvdrTp8XpRugPVDQ3W',_binary '\0','1998-11-09','2022-02-17 19:04:49.697000','취뽀하자','tenykim1109@kakao.com','덱1스','$2a$10$/Ac/wD7acM9xeyNTp8SIhualmo1UHg3Hm3Tn/7S4X.b9BUol57AuK','','local',NULL,NULL,NULL),(4,NULL,'BNycNn0oMY550h2cDsZRzbSxo6dfYpsjWtKfqDWugRuqaADQCB',_binary '\0','1998-09-18','2022-02-17 19:07:11.534000','매주 한 권 읽기!','yhyh0918@naver.com','책벌레','$2a$10$AYMtM3OzrI8pCij44r867uJaDyanYMVjiTdTSa1bfEDnox1NeJE0e','/images/profile/profile_purple.png','local',NULL,NULL,NULL),(5,NULL,NULL,_binary '',NULL,NULL,NULL,'kgw012@gmail.com','김길웅',NULL,'https://lh3.googleusercontent.com/a-/AOh14GikCh9l2evDdEQkJbgTEzuv1x4DcQlLWQDFBSA8_g=s96-c','google','114208537869835398358',NULL,NULL),(6,NULL,'PFUFRVRXF4lhoVqT6w8VMDr7TOLoGLFlSBTFBmmQ9PCB1sJL9B',_binary '\0',NULL,'2022-02-17 19:21:52.544000',NULL,'yhyh091@naver.com','가즈아','$2a$10$YeO5pmqEgKDWF.HZtmB3peaPM/w0IrkdHBWCBIW86rFPCIqRGSYOe',NULL,'local',NULL,NULL,NULL),(8,NULL,'LfEe0TpHgmVyD8bOcppOZ0aSGIV2k9JM8NDEQzwqA9V1YgFVGO',_binary '\0',NULL,'2022-02-17 20:02:13.056000',NULL,'kgw012345@gmail.com','끼룽이222','$2a$10$VQYlMsjb0arBESxSciVnyOyOuBqTGMm45sIO/ycHZFKjPuAkWzpd6',NULL,'local',NULL,NULL,NULL),(9,NULL,NULL,_binary '',NULL,NULL,NULL,'hyeyun3306@gmail.com','윤혜윤',NULL,'https://lh3.googleusercontent.com/a/AATXAJwV-6ZcenOH6emPrWVK_uZFr8_9khKfO0tLfU3X9X8=s96-c','google','116234699559199915152',NULL,NULL),(10,NULL,'BtgTTgbvU5x3NoAAuADzIK9nWvKewBEzUb5H8eOHrWIvYdMqpO',_binary '\0','1995-12-05','2022-02-18 10:21:55.208000','취뽀하자!!','js.pekah@gmail.com','요셉','$2a$10$oYGjLR14VYobFbS1t.zpLOs8sg3kNH5oZSo7bTr/CE/4x76QhhQRm','','local',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18 11:25:10
