-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: museum_info_system
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('architecture','Kiến trúc'),('art','Nghệ thuật'),('culture','Văn hóa'),('history','Lịch sử'),('literature','Văn học'),('music','Âm nhạc'),('nature','Thiên nhiên'),('science','Khoa học'),('technology','Công nghệ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_tickets`
--

DROP TABLE IF EXISTS `event_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_tickets` (
  `event_id` int NOT NULL,
  `total_tickets` int NOT NULL,
  `available_tickets` int NOT NULL,
  `ticket_price` decimal(10,2) NOT NULL,
  `ticket_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ticket_image` text COLLATE utf8mb4_general_ci,
  `ticket_description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`event_id`),
  CONSTRAINT `event_tickets_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_tickets`
--

LOCK TABLES `event_tickets` WRITE;
/*!40000 ALTER TABLE `event_tickets` DISABLE KEYS */;
INSERT INTO `event_tickets` VALUES (1,100,98,50.00,'Vé triển lãm cổ vật 1','wood-and-glass.png','Vé dành cho triển lãm cổ vật'),(2,150,148,75.00,'Vé triển lãm cổ vật 2','people-and-party.png','Vé VIP cho triển lãm cổ vật'),(3,120,118,40.00,'Vé triển lãm tranh hiện đại 1','girl-and-boat.png','Vé dành cho triển lãm tranh hiện đại'),(4,200,199,60.00,'Vé triển lãm tranh hiện đại 2','classic-people.png','Vé VIP cho triển lãm tranh hiện đại'),(5,250,249,80.00,'Vé tham quan ngày hội khoa học 1','pic-and-pic.png','Vé dành cho ngày hội khoa học'),(6,300,299,100.00,'Vé ngày hội khoa học 2','girl-and-child.png','Vé gia đình cho ngày hội khoa học'),(7,150,149,70.00,'Vé tham gia lễ hội văn hóa 1','culture-festival.png','Vé dành cho lễ hội văn hóa'),(8,180,179,55.00,'Vé triển lãm công nghệ 1','tech-exhibit.png','Vé dành cho triển lãm công nghệ'),(9,220,219,90.00,'Vé hòa nhạc 1','concert.png','Vé dành cho buổi hòa nhạc'),(10,220,220,120.00,'Vé triển lãm kiến trúc 1','architecture-exhibit.png','Vé dành cho triển lãm kiến trúc'),(11,220,220,88.00,'Vé tham gia ngày hội thiên nhiên 1','nature-festival.png','Vé dành cho ngày hội thiên nhiên'),(12,220,220,99.00,'Vé triển lãm văn học 1','literature-exhibit.png','Vé dành cho triển lãm văn học');
/*!40000 ALTER TABLE `event_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `event_date` date NOT NULL,
  `event_image` text COLLATE utf8mb4_general_ci,
  `description` text COLLATE utf8mb4_general_ci,
  `museum_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `museum_id` (`museum_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`museum_id`) REFERENCES `museums` (`museum_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Triển lãm cổ vật thao tác bàn mài (chất liệu: đá)','2024-12-25','bàn mài.jpg','Bàn mài – khai quật tại di chỉ khảo cổ học Vườn đình Khuê Bắc, phường Hòa Hải, quận Ngũ Hành Sơn, thành phố Đà Nẵng, năm 2001, có niên đại thế kỷ thứ II sau công nguyên (thuộc giai đoạn văn hóa sơ kỳ kim khí tiền Sa Huỳnh).',1),(2,'Triển lãm tranh hiện đại (chất liệu: sơn dầu)','2024-12-15','vogueart0.jpg','Trưng bày các tác phẩm nghệ thuật hiện đại',2),(3,'Ngày hội Khoa học','2024-12-20','','Hoạt động giáo dục về khoa học',3),(4,'Ngày hội thiên nhiên','2025-01-25','','Khám phá thiên nhiên và động vật',4),(5,'Triển lãm công nghệ','2025-01-10','','Giới thiệu các công nghệ mới',5),(6,'Lễ hội Văn hóa','2024-12-25','','Khám phá văn hóa các dân tộc',6),(7,'Triển lãm kiến trúc','2025-01-20','','Trưng bày các mẫu kiến trúc độc đáo',7),(8,'Buổi hòa nhạc','2025-01-15','','Hòa nhạc các tác phẩm nổi tiếng',8),(9,'Triển lãm văn học','2025-02-01','','Trưng bày các tác phẩm văn học nổi tiếng',9);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `museums`
--

DROP TABLE IF EXISTS `museums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `museums` (
  `museum_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `museum_image` text COLLATE utf8mb4_general_ci,
  `category_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `open_time` time DEFAULT NULL,
  `close_time` time DEFAULT NULL,
  PRIMARY KEY (`museum_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `museums_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `museums`
--

LOCK TABLES `museums` WRITE;
/*!40000 ALTER TABLE `museums` DISABLE KEYS */;
INSERT INTO `museums` VALUES (1,'Bảo tàng Lịch sử Quốc gia','Đà Nẵng','Trưng bày các hiện vật lịch sử của thành phố Đà Nẵng','museum-img-1.png','history','08:30:00','13:30:00'),(2,'Bảo tàng Nghệ thuật','Đà Nẵng','Các tác phẩm nghệ thuật đương đại','museum-img-2.png','art','07:30:00','12:30:00'),(3,'Bảo tàng Khoa học','Đà Nẵng','Giới thiệu các thành tựu khoa học','museum-img-3.png','science','09:30:00','14:30:00'),(4,'Bảo tàng Thiên nhiên','Đà Nẵng','Khám phá thiên nhiên và động vật','museum-img-4.png','nature','10:00:00','15:00:00'),(5,'Bảo tàng Công nghệ','Đà Nẵng','Trưng bày các phát minh công nghệ','museum-img-5.png','technology','09:00:00','14:00:00'),(6,'Bảo tàng Văn hóa','Đà Nẵng','Khám phá văn hóa Việt Nam','museum-img-6.png','culture','08:00:00','13:00:00'),(7,'Bảo tàng Kiến trúc','Đà Nẵng','Trưng bày kiến trúc cổ điển và hiện đại','museum-img-7.png','architecture','07:00:00','12:00:00'),(8,'Bảo tàng Âm nhạc','Đà Nẵng','Khám phá âm nhạc truyền thống và hiện đại','museum-img-8.png','music','13:30:00','17:30:00'),(9,'Bảo tàng Văn học','Đà Nẵng','Trưng bày các tác phẩm văn học nổi tiếng','people-and-party.png','literature','14:30:00','19:30:00');
/*!40000 ALTER TABLE `museums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_method` enum('PayPal') COLLATE utf8mb4_general_ci DEFAULT 'PayPal',
  `payment_status` enum('Completed','Pending','Failed') COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `paypal_order_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `paypal_capture_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `paypal_transaction_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `paypal_payer_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `currency_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT 'USD',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,3,1,50.00,'PayPal','Completed','3J2824738Y700254R','5SM15454DX877831D','5SM15454DX877831D','YK792X55R7QVN','USD','2024-12-11 16:07:44','2024-12-11 16:07:44');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_types`
--

DROP TABLE IF EXISTS `post_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_types` (
  `post_type_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `post_type_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`post_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_types`
--

LOCK TABLES `post_types` WRITE;
/*!40000 ALTER TABLE `post_types` DISABLE KEYS */;
INSERT INTO `post_types` VALUES ('announcement','Thông báo'),('blog','Blog'),('event','Sự kiện'),('experience','Trải nghiệm'),('feature','Tính năng'),('interview','Phỏng vấn'),('news','Tin tức'),('relationship','Quan hệ'),('review','Đánh giá'),('role','Vai trò'),('update','Cập nhật');
/*!40000 ALTER TABLE `post_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `post_date` date NOT NULL,
  `post_type_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `post_image` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `post_type_id` (`post_type_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`post_type_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,2,'[THÔNG BÁO] VỀ VIỆC DỪNG ĐÓN, PHỤC VỤ KHÁCH THAM QUAN BẢO TÀNG ĐÀ NẴNG TẠI ĐỊA ĐIỂM 24 TRẦN PHÚ, THÀNH PHỐ ĐÀ NẴNG','\"Để tập trung thực hiện công tác di dời tài liệu, hiện vật phục vụ thi công trưng bày Bảo tàng Đà Nẵng tại địa điểm mới (số 42 – 44 Bạch Đằng và 31 Trần Phú), Bảo tàng Đà Nẵng thông báo dừng đón, phục vụ khách tham quan Bảo tàng và Di tích Quốc gia đặc biệt Thành Điện Hải tại địa điểm 24 Trần Phú, thành phố Đà Nẵng kể từ ngày 10 tháng 12 năm 2024.\"','2024-12-05','announcement','thong-bao-news.png'),(2,1,'[TRẢI NGHIỆM] “CHUYỆN LÀNG, CHUYỆN PHỐ” TẠI NGÀY HỘI DI SẢN VĂN HÓA ĐÀ NẴNG NĂM 2024','\"Nằm trong danh mục các hoạt động văn hóa – lễ hội hai bên bờ sông Hàn do Ủy ban nhân dân thành phố Đà Nẵng ban hành hằng năm, chương trình “Ngày hội Di sản văn hóa Đà Nẵng” là một trong những sự kiện văn hóa nổi bật được Bảo tàng Đà Nẵng tổ chức vào dịp kỷ niệm Ngày Di sản văn hóa Việt Nam 23/11. Năm nay, chương trình “Ngày hội Di sản văn hóa Đà Nẵng” mang chủ đề “Chuyện làng, Chuyện phố” được tổ chức trong 02 ngày 22 và 23/11/2024 tại khuôn viên Bảo tàng Đà Nẵng, số 24 Trần Phú.\"','2024-12-01','experience','trai-nghiem-news.jpg'),(3,2,'[QUAN HỆ] ĐỐI TÁC GIỮA BẢO TÀNG VÀ SINH VIÊN CÁC TRƯỜNG ĐẠI HỌC, MỘT SỐ THẢO LUẬN VÀ LIÊN HỆ THỰC TIỄN TẠI BẢO TÀNG BỆNH VIỆN GLENSIDE, TP. BRISTOL, VƯƠNG QUỐC ANH','\"Bảo tàng là nơi thú vị và đầy cảm hứng để học hỏi và điều này tạo nên sự khác biệt đối với con người cũng như phương pháp họ học tập (Hội đồng Nghệ thuật Anh, 2018). Sinh viên đến với các bảo tàng để tìm kiếm và để thỏa mãn nhu cầu học tập, giải trí và hưởng thụ các giá trị mà bảo tàng mang lại. Bảo tàng trao cho sinh viên cơ hội học tập, trải nghiệm, thực hành cho sinh viên, ngược lại sinh viên đóng góp và tạo ra những sản phẩm, những ý tưởng mới có thể tạo ra sự thay đổi cho hoạt động của bảo tàng. Mối liên hệ hợp tác giữa các trường đại học và các bảo tàng cần được xây dựng trên cơ sở sự hợp tác giữa hai bên, vì mục tiêu và lợi ích của các hai bên. Để sự liên hệ này không thiên về một chiều, tức là các bảo tàng hỗ trợ các sinh viên thông qua các sưu tập của mình, mà trở thành mối liên hệ qua lại đôi bên cùng có lợi, ứng dụng những nghiên cứu đa dạng của sinh viên để đổi mới hoạt động của các bảo tàng, cần có sự đầu tư nghiên cứu, khảo sát nhu cầu và đánh giá mức độ hợp tác từ cả hai phía. Những mô hình hợp tác hiệu quả cho thấy năng lực dồi dào của sinh viên trong các dự án hợp tác với bảo tàng khi họ được đánh giá đúng mức và trao cơ hội thể hiện. Điều này cũng phần nào tạo động lực mạnh mẽ cho các bảo tàng trong việc chủ động tiếp cận và khai thác nguồn nhân lực từ sinh viên các trường đại học để nâng cao hiệu quả hoạt động của mình.\"','2024-11-05','relationship','quan-he-news.jpg'),(4,1,'[VAI TRÒ] CỦA VIỆC CHUẨN BỊ NỘI DUNG TRƯNG BÀY TRONG QUÁ TRÌNH THỰC HIỆN DỰ ÁN XÂY DỰNG VÀ TRƯNG BÀY BẢO TÀNG (TRƯỜNG HỢP BẢO TÀNG ĐÀ NẴNG)','\"Công tác chuẩn bị nội dung trưng bày bảo tàng là công tác mang tính khoa học gắn liền với yêu cầu nghiên cứu và sáng tạo. Nếu không thực hiện việc này thì trưng bày bảo tàng không thể thực hiện được bởi lẽ trưng bày bảo tàng hoàn toàn không phải là công việc mang tính máy móc đem hiện vật bảo tàng trưng bày minh họa cho một đề tài hay một vấn đề nào đó. Vì vậy, đòi hỏi cán bộ bảo tàng không những nghiên cứu ra nội dung chủ đề, thông điệp mà còn kết hợp với các yếu tố lựa chọn, sắp xếp tư liệu, hiện vật cho phù hợp nội dung để có thể diễn giải, truyền đạt nội dung tư tưởng của trưng bày đến với công chúng. Ở thời điểm hiện tại, dự án Bảo tàng Đà Nẵng đã dần lộ diện. Cả 4 khối nhà của công trình đã hoàn thiện. Tòa nhà cổ đã được khôi phục cẩn trọng và phục chế lại gần như nguyên mẫu của tòa nhà năm xưa. Còn phần khối nhà mới được thiết kế với ngôn ngữ kiến trúc hiện đại với gam màu gỗ ghi ấm cho cảnh quan chung, gợi nhớ lại màu sắc của mây tre và các thiết kế tinh tế của đồ gỗ và đan dệt. Mặc dù chưa khánh thành, Tòa Đốc lý mà nay là Bảo tàng Đà Nẵng sau khi “khoác” lên mình “tấm áo mới” đã trở thành điểm check-in đầy thú vị của nhiều bạn trẻ và du khách. Công trình đã hoàn thành phần thi công các khối nhà và hiện đang tiếp tục thi công nội thất trưng bày theo đề cương nội dung chi tiết đã được phê duyệt. Trong tương lai, Bảo tàng Đà Nẵng sau khi đi vào hoạt động chắn chắn sẽ trở thành một địa chỉ hấp dẫn đối với công chúng. Đây không chỉ là điểm đến của du khách, những người yêu thích bảo tàng mà còn là một không gian cộng đồng phục vụ nhu cầu học tập, nghiên cứu, tham quan, tìm hiểu, hưởng thụ văn hóa của người dân thành phố Đà Nẵng.\"','2024-11-04','role','vai-tro-news.png'),(5,2,'[ĐÁNH GIÁ]','\"VỀ TRIỂN LÃM VĂN HỌC MỚI NHẤT\"','2024-12-10','review','classic-people.png'),(6,1,'[PHỎNG VẤN]','\"Để phục vụ cho chương trình thực tế môn Chính trị cũng như tìm hiểu thêm về lịch sử nước nhà, về Chủ tịch Hồ Chí Minh, ngày 22/6, các sinh viên ngành Báo chí khóa 2023 của Trường Cao đẳng Phát thanh - Truyền hình II đã có buổi ngoại khóa ở Bảo tàng Hồ Chí Minh (Bến Nhà Rồng). Đồng thời, Tổ đảng sinh viên thuộc Chi bộ Trường Cao đẳng Phát thanh - Truyền hình II đã có chuyến đi về nguồn tại Bảo tàng.\"','2024-12-10','interview','phong-van-news.jpg'),(7,2,'[Blog]','\"Khám phá các sự kiện văn hóa tại bảo tàng.\"','2024-12-11','blog',NULL),(8,1,'[Đánh giá]','\'Cập nhật về các hoạt động tại bảo tàng.\'','2024-12-11','update',NULL),(9,1,'[Tính năng]','\'Tính năng mới trong ứng dụng bảo tàng.\'','2024-12-11','feature',NULL),(10,2,'[Sự kiện]','\'Lịch trình cho ngày hội khoa học.\'','2024-12-11','event',NULL),(11,1,'[Tin tức]','\'Những điều thú vị về bảo tàng nghệ thuật.\'','2024-12-11','news',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_event`
--

DROP TABLE IF EXISTS `review_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_event` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  CONSTRAINT `review_event_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_event`
--

LOCK TABLES `review_event` WRITE;
/*!40000 ALTER TABLE `review_event` DISABLE KEYS */;
INSERT INTO `review_event` VALUES (1,1,1,'Đánh giá Triển lãm cổ vật','khac.chinh@museum.com','Khắc Chỉnh','Triển lãm rất thú vị, tôi đã học được nhiều điều mới!',5),(2,2,2,'Đánh giá Triển lãm tranh hiện đại','quang.nghia@museum.com','Quang Nghĩa','Tranh rất đẹp, nhưng không gian hơi chật chội.',4),(3,3,3,'Đánh giá Ngày hội Khoa học','phuocdinh@museum.com','Phước Định','Hoạt động giáo dục rất bổ ích cho trẻ em.',5),(4,4,4,'Đánh giá Lễ hội Văn hóa','bob.brown@museum.com','Bob','Brown Lễ hội văn hóa rất đặc sắc, tôi đã có những trải nghiệm tuyệt vời.',5),(5,5,5,'Đánh giá Triển lãm công nghệ','charlie.white@museum.com','Charlie White','Triển lãm công nghệ rất ấn tượng, nhưng giá vé hơi cao.',3);
/*!40000 ALTER TABLE `review_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User'),(3,'Editor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_details`
--

DROP TABLE IF EXISTS `ticket_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_details` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `purchase_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ticket_quantity` int NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `ticket_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `ticket_details_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_details`
--

LOCK TABLES `ticket_details` WRITE;
/*!40000 ALTER TABLE `ticket_details` DISABLE KEYS */;
INSERT INTO `ticket_details` VALUES (1,1,2,'2024-12-11 16:02:21',2),(2,1,1,'2024-12-11 16:02:21',1),(3,2,2,'2024-12-11 16:02:21',3),(4,3,5,'2024-12-11 16:02:21',1),(5,4,6,'2024-12-11 16:02:21',2),(6,5,7,'2024-12-11 16:02:21',4),(7,6,8,'2024-12-11 16:02:21',1),(8,1,3,'2024-12-11 16:07:44',1);
/*!40000 ALTER TABLE `ticket_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_info` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` int DEFAULT NULL,
  `status_user` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@museum.com','0905907073','Danang city','$2b$10$9BYOh9caEuIer4W1oEOcP.loXs4dy9VltzXWfXWKiWdtBxUIZ9fea',1,'active',''),(2,'quangvoadmin','quangvoadmin@museum.com','0905907073','Danang','$2b$10$sGaISCAa5ZbZ6QF.rX9nCOP4o5PJetApWMP2N7asfE7nrjWreqUf6',1,'Active','my-avt.png'),(3,'taotaikhoan','taotaikhoan@gmail.com','8386','Hanoi','$2b$10$FUi.kq54onm5QB73R6GtzeHgQBq/ppij02fyffFtG1i33ki4no4q.',3,'Activated','plus+');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12  1:29:08
