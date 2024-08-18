-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: eastapp
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `class_id` int unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) NOT NULL,
  `teacher_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `fk_teacher_id` (`teacher_id`),
  CONSTRAINT `fk_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'10th',NULL),(2,'11th',NULL),(3,'12th',NULL),(4,'9th',NULL);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `income` int DEFAULT NULL,
  `expense` int DEFAULT NULL,
  `source` varchar(255) NOT NULL,
  `_dated` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (26,2500,NULL,'Habib Fee collection','02-15-2024'),(27,NULL,1200,'Pizza & Party','02-22-2024'),(28,NULL,1000,'Purchased a chair','02-22-2024');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee`
--

DROP TABLE IF EXISTS `fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee` (
  `fee_id` int unsigned NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'unpaid',
  PRIMARY KEY (`fee_id`),
  CONSTRAINT `fee_chk_1` CHECK ((`amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee`
--

LOCK TABLES `fee` WRITE;
/*!40000 ALTER TABLE `fee` DISABLE KEYS */;
INSERT INTO `fee` VALUES (1,2500,'unpaid'),(2,2500,'unpaid'),(3,2500,'unpaid'),(4,3323,'unpaid'),(5,3323,'unpaid'),(6,4500,'unpaid'),(7,4500,'unpaid'),(8,4500,'unpaid'),(9,4500,'unpaid'),(10,4500,'unpaid'),(11,4500,'unpaid'),(12,4500,'unpaid'),(13,4500,'unpaid'),(14,34951731,'unpaid'),(15,34951731,'unpaid'),(16,1500,'paid'),(17,2122,'unpaid'),(18,1500,'unpaid'),(19,4500,'unpaid'),(20,4500,'unpaid'),(21,4500,'unpaid'),(22,4500,'unpaid'),(23,4500,'unpaid'),(24,4500,'unpaid'),(25,4500,'unpaid'),(26,1600,'unpaid'),(27,1600,'unpaid'),(28,1600,'unpaid'),(29,1500,'unpaid'),(30,1500,'unpaid'),(31,1400,'unpaid'),(32,4500,'unpaid'),(33,8000,'unpaid'),(34,1600,'unpaid'),(35,1600,'unpaid'),(36,1600,'unpaid'),(37,6000,'unpaid'),(38,6000,'unpaid');
/*!40000 ALTER TABLE `fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `mark_id` int unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int unsigned NOT NULL,
  `subject` varchar(255) NOT NULL,
  `obtained` int NOT NULL,
  `total` int NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `_dated` date NOT NULL,
  PRIMARY KEY (`mark_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `_dated` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `class_id` int unsigned NOT NULL,
  `fee_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `class_id` (`class_id`),
  KEY `fk_student_fee_id` (`fee_id`),
  CONSTRAINT `fk_student_fee_id` FOREIGN KEY (`fee_id`) REFERENCES `fee` (`fee_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Ahsen Arif','2024-02-24','Male','Mundair Sharif Sayedan','0349324666','academy',2,6),(7,'Hibba Bukhari','2024-02-24','Female','Mundair Sharif Sayedan','43422525235','academy',2,24),(10,'Sidra','2024-02-24','Female','Shumailia Pakistan','034329213','school',3,15),(11,'Habib ul Hassan','2024-02-25','Male','Sambrial Sialkot','034193217313','academy',2,16),(12,'Bilal','2024-02-25','Male','Ali Stree 9B Af','04832018347','academy',1,17),(15,'Salman Mughal','2024-02-25','Female','Sialkot Matheww Street','0342813913','school',3,26),(16,'Bilal Javed 2','2024-02-26','Female','Daska','0347287131','academy',1,27),(17,'Asad Mughal','2024-02-26','Female','Berlin Street','034727163','academy',1,28),(19,'Atique Jutt','2024-02-26','Female','Sambrial Housing Scheme','03482714413','school',1,30),(20,'Qayyum Ali','2024-02-26','Male','Sialkot Street of House','04284371364','school',1,31),(21,'shorya husnain','2024-02-27','Male','ugoki model town','051173784729','school',1,33),(22,'Hamza Mughal','2024-02-27','Female','mundair sahrif 123','03816361553','academy',3,36),(23,'Abdullah Qayyum','2024-02-28','Female','Sambrial Sialkot Mohalla Waterworks','04732486187423','school',1,38);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacher_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (11,'John Doe','academy','123 Main St','Male','555-123-4567'),(12,'Jane Smith','school','456 Elm St','Female','555-789-0123'),(13,'Mike Wilson','academy','789 Oak St','Male','555-456-7890'),(14,'Alice Johnson','school','101 Pine St','Female','555-246-8135'),(15,'Bob Davis','academy','234 Maple St','Male','555-987-6543'),(16,'Carol Garcia','school','567 Spruce St','Female','555-321-5478'),(17,'David Miller','academy','890 Cedar St','Male','555-654-1239'),(18,'Susan Hernandez','school','123 Poplar St','Female','555-098-7654'),(19,'Mark Robinson','academy','456 Willow St','Male','555-543-2108'),(20,'Emily Lee','school','789 Birch St','Female','555-789-3210'),(25,'Kinza2','school','Sialkot Area of Love','Female','03412341'),(27,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(28,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(29,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(30,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(31,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(32,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(34,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(35,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(36,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(37,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(38,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(39,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(40,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121'),(41,'Jia Akhtar','academy','Sialkot Area of Love','Female','0341234121');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','123',1);
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

-- Dump completed on 2024-03-01 23:39:50
