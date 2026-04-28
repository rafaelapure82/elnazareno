-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `actividad_imagenes`
--

DROP TABLE IF EXISTS `actividad_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad_imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actividad_id` int NOT NULL,
  `imagen_url` varchar(255) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `actividad_id` (`actividad_id`),
  CONSTRAINT `actividad_imagenes_ibfk_1` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad_imagenes`
--

LOCK TABLES `actividad_imagenes` WRITE;
/*!40000 ALTER TABLE `actividad_imagenes` DISABLE KEYS */;
INSERT INTO `actividad_imagenes` VALUES (120,75,'/carpeta-actividades/773ca037-6769-4220-869f-b069951dccf7.jpeg','2026-01-29 20:46:36'),(121,75,'/carpeta-actividades/f2fbf62a-c388-4e23-b50d-3bfd4ecb7d12.jpg','2026-01-29 20:46:36'),(122,75,'/carpeta-actividades/43c724a2-e95b-4194-8444-d1c521613e69.jpg','2026-01-29 20:46:36');
/*!40000 ALTER TABLE `actividad_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividades`
--

DROP TABLE IF EXISTS `actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES (75,'Actividad','Esta es una descripción','2026-01-29 20:46:36','2026-01-29 20:46:36');
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivos_subidos`
--

DROP TABLE IF EXISTS `archivos_subidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivos_subidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_original` varchar(255) NOT NULL,
  `nombre_guardado` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `description` text,
  `nombre` varchar(255) NOT NULL DEFAULT '',
  `categoria` varchar(100) NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_categoria` (`categoria`),
  KEY `idx_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos_subidos`
--

LOCK TABLES `archivos_subidos` WRITE;
/*!40000 ALTER TABLE `archivos_subidos` DISABLE KEYS */;
INSERT INTO `archivos_subidos` VALUES (57,'ESTADISTICA ENERO 2026-MARIELBA RODRIGUEZ.xlsx','archivo-1769733480439-510211725.xlsx','C:\\Users\\JuanV\\Desktop\\El_Proyecto\\backend\\src\\modulos\\archivos\\carpeta-archivos\\archivo-1769733480439-510211725.xlsx',569954,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Esta es la estadística del mes de enero','ESTADISTICA ENERO 2026-MARIELBA RODRIGUEZ','documentos','2026-01-30 00:38:00'),(58,'reporte_completo_administrativo_1769729940958.xlsx','archivo-1769733686925-795959677.xlsx','C:\\Users\\JuanV\\Desktop\\El_Proyecto\\backend\\src\\modulos\\archivos\\carpeta-archivos\\archivo-1769733686925-795959677.xlsx',28881,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Reporte','Nombre no original','general','2026-01-30 00:41:26');
/*!40000 ALTER TABLE `archivos_subidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descargas_archivos`
--

DROP TABLE IF EXISTS `descargas_archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descargas_archivos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `archivo_id` int NOT NULL,
  `usuario_id` int DEFAULT NULL,
  `fecha_descarga` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_cliente` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `metodo_descarga` varchar(10) DEFAULT 'directa',
  PRIMARY KEY (`id`),
  KEY `idx_archivo` (`archivo_id`),
  KEY `idx_usuario` (`usuario_id`),
  KEY `idx_fecha` (`fecha_descarga`),
  CONSTRAINT `descargas_archivos_ibfk_1` FOREIGN KEY (`archivo_id`) REFERENCES `archivos_subidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `descargas_archivos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descargas_archivos`
--

LOCK TABLES `descargas_archivos` WRITE;
/*!40000 ALTER TABLE `descargas_archivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `descargas_archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante_seccion`
--

DROP TABLE IF EXISTS `estudiante_seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante_seccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estudiante_id` int NOT NULL,
  `seccion_id` int NOT NULL,
  `año_escolar` year NOT NULL,
  `fecha_inscripcion` date DEFAULT NULL,
  `estado` enum('activo','inactivo','graduado') DEFAULT 'activo',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_estudiante_año` (`estudiante_id`,`año_escolar`),
  KEY `seccion_id` (`seccion_id`),
  CONSTRAINT `estudiante_seccion_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `estudiante_seccion_ibfk_2` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante_seccion`
--

LOCK TABLES `estudiante_seccion` WRITE;
/*!40000 ALTER TABLE `estudiante_seccion` DISABLE KEYS */;
INSERT INTO `estudiante_seccion` VALUES (14,60,19,2025,'2026-02-12','activo','2026-02-12 15:36:31');
/*!40000 ALTER TABLE `estudiante_seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` enum('Masculino','Femenino','Otro') NOT NULL,
  `tiene_cedula` tinyint(1) DEFAULT '0',
  `nacionalidad` varchar(100) DEFAULT NULL,
  `tipo_sangre` varchar(10) DEFAULT NULL,
  `tipo_cedula` varchar(20) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `cedula_escolar` varchar(20) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `representante_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `direccion_estado` varchar(100) DEFAULT NULL,
  `direccion_municipio` varchar(100) DEFAULT NULL,
  `direccion_parroquia` varchar(100) DEFAULT NULL,
  `direccion_sector` varchar(100) DEFAULT NULL,
  `direccion_calle` varchar(150) DEFAULT NULL,
  `direccion_casa` varchar(50) DEFAULT NULL,
  `direccion_referencia` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula_escolar` (`cedula_escolar`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `representante_id` (`representante_id`),
  KEY `idx_estudiantes_cedula` (`cedula`),
  CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`representante_id`) REFERENCES `representantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (60,'Juan Carlos','Perez','2011-06-15','Masculino',0,'Venezolana','A+',NULL,NULL,'11330123548','foto-line_drawing_of_family_vector-1770910051957-889906920.jpg',101,'2026-02-12 15:27:32','Apure','San Fernando','San Fernando','Centro',NULL,NULL,NULL);
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotos_estudiantes`
--

DROP TABLE IF EXISTS `fotos_estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotos_estudiantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estudiante_id` int NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta` varchar(500) NOT NULL,
  `tipo_mime` varchar(50) DEFAULT NULL,
  `tamano` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_estudiante_foto` (`estudiante_id`),
  KEY `fk_foto_estudiante` (`estudiante_id`),
  CONSTRAINT `fk_foto_estudiante` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotos_estudiantes`
--

LOCK TABLES `fotos_estudiantes` WRITE;
/*!40000 ALTER TABLE `fotos_estudiantes` DISABLE KEYS */;
INSERT INTO `fotos_estudiantes` VALUES (26,60,'foto-line_drawing_of_family_vector-1770910051957-889906920.jpg','C:\\Users\\JuanV\\Desktop\\El_Proyecto\\backend\\src\\modulos\\estudiantes\\carpeta-estudiantes\\foto-line_drawing_of_family_vector-1770910051957-889906920.jpg','image/jpeg',50749,'2026-02-12 15:27:32');
/*!40000 ALTER TABLE `fotos_estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grados`
--

DROP TABLE IF EXISTS `grados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `nivel` enum('Inicial','Primaria','Media','Jovenes y Adultos') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_grados_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grados`
--

LOCK TABLES `grados` WRITE;
/*!40000 ALTER TABLE `grados` DISABLE KEYS */;
INSERT INTO `grados` VALUES (15,'1ER GRADO','Inicial','2026-01-30 00:05:11','2026-01-30 00:05:30'),(16,'2DO GRADO','Primaria','2026-02-12 15:35:11','2026-02-12 15:35:11');
/*!40000 ALTER TABLE `grados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('docente','administrativo','obrero') NOT NULL,
  `estado` enum('activo','inactivo','jubilado') DEFAULT 'activo',
  `primer_nombre` varchar(50) NOT NULL,
  `segundo_nombre` varchar(50) DEFAULT NULL,
  `primer_apellido` varchar(50) NOT NULL,
  `segundo_apellido` varchar(50) DEFAULT NULL,
  `cedula` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `sexo` enum('masculino','femenino','otro') NOT NULL,
  `cargo_voucher` varchar(100) NOT NULL,
  `codigo_cargo` varchar(50) DEFAULT NULL,
  `dependencia` varchar(100) NOT NULL,
  `codigo_dependencia` varchar(50) DEFAULT NULL,
  `carga_horaria` varchar(50) DEFAULT NULL,
  `fecha_ingreso_mppe` date NOT NULL,
  `titulos_profesionales` text,
  `tipo_titulo` varchar(15) DEFAULT NULL,
  `talla_franela` varchar(10) DEFAULT NULL,
  `talla_pantalon` varchar(10) DEFAULT NULL,
  `talla_zapato` varchar(10) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (7,'docente','activo','Juan',NULL,'perez',NULL,'123456879','0247-3418721','nuevo@email.com','1990-05-15','femenino','Docente','0002225565','zona educativa','20111888888','45.5','2008-10-15','null','null','s','26','34','2025-06-25 14:54:45','2026-01-19 21:24:08'),(28,'obrero','activo','Juan','Carlos','Perez','Rodriguez','1221322','04243045698','ejemplo@gmail.com','2014-06-20','masculino','Profesor','P-123','Departamente','Dep-1232','23','2026-01-22','vamos bien ?','licenciatura','M','34','38','2026-01-17 07:47:58','2026-01-17 07:47:58'),(38,'administrativo','activo','Juana','Josefina','Perez','Rodriguez','30493485','04243049657','elcorreo@gmail.com','1985-06-18','masculino','Profesor','P-1232','Departamento','Dep-1232','40','2002-06-04','Este es el tituloaaaaaaaaaaa','especializacion','L','40','43','2026-01-19 01:35:57','2026-01-29 22:48:07'),(39,'administrativo','activo','Pedrito','Jose','Perez','Gutierrez','12147852','04144542579','estoesejemplo@gmail.com','1979-06-18','masculino','Profesor','P-1232','Departamento ciencias','Dep-321','35','2015-06-18','Profesor ancredess','tecnico','XL','40','43','2026-01-19 03:29:26','2026-01-19 07:42:56'),(40,'administrativo','activo','Juan','perez','Jose','Rodriguez','123213213','0414458793','ejemplo@gmail.com','2015-06-19','masculino','Profeosaras','P-21312','Deparmatento','Dep-12321','43','2026-01-07','Hola que tal','licenciatura','M','38','38','2026-01-19 08:20:21','2026-01-19 08:21:17'),(42,'administrativo','activo','Juan','Josefino','Perez','Gutierrez','12342123','04144768293','estoesuncorreo@gmail.com','1974-09-04','masculino','Profesor en Matematicas','P-1222','Departamento','Dep-1232','40','2017-06-13','Sin titulos papa','tsu','L','36','39','2026-01-19 16:50:09','2026-01-29 22:38:50'),(45,'docente','activo','Juan','Carlos','Perez','Rodriguez','16270047','04124508862','ejemplo@gmail.com','1990-11-06','masculino','Profesor en Matematicas','P-12321','Zona','Dep-123','40','2020-06-12','En Educacion','licenciatura','L','34','38','2026-02-12 15:34:23','2026-02-12 15:34:23');
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_archivos`
--

DROP TABLE IF EXISTS `personal_archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_archivos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personal_id` int NOT NULL,
  `nombre_original` varchar(255) NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta_archivo` varchar(255) NOT NULL,
  `tipo_archivo` enum('imagen','pdf','documento','otro') NOT NULL DEFAULT 'documento',
  `mime_type` varchar(100) NOT NULL,
  `size_bytes` int NOT NULL,
  `descripcion` text,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `personal_id` (`personal_id`),
  KEY `idx_tipo_archivo` (`tipo_archivo`),
  CONSTRAINT `personal_archivos_ibfk_1` FOREIGN KEY (`personal_id`) REFERENCES `personal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_archivos`
--

LOCK TABLES `personal_archivos` WRITE;
/*!40000 ALTER TABLE `personal_archivos` DISABLE KEYS */;
INSERT INTO `personal_archivos` VALUES (24,7,'persona_bdv_cuenta_7982.pdf','1768857848578-484495530.pdf','1768857848578-484495530.pdf','pdf','application/pdf',563118,'','2026-01-22 01:34:37'),(28,42,'constancia de trabajo.pdf','1768938823278-494620458.pdf','1768938823278-494620458.pdf','pdf','application/pdf',186422,'','2026-01-29 22:38:50'),(29,42,'por-quÃ©-son-asÃ­-ni-lo-conozco-v0-2uux5y7ji2uc1.png','1768938823281-466253545.png','1768938823281-466253545.png','imagen','image/png',421689,'','2026-01-29 22:38:50'),(31,7,'570844412_1273555898120004_9051489790622148105_n.jpg','1769045677582-805055718.jpg','1769045677582-805055718.jpg','imagen','image/jpeg',33491,'','2026-01-22 01:34:37');
/*!40000 ALTER TABLE `personal_archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_seccion`
--

DROP TABLE IF EXISTS `profesor_seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_seccion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profesor_id` int NOT NULL,
  `seccion_id` int NOT NULL,
  `es_tutor` tinyint(1) DEFAULT '0',
  `fecha_asignacion` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_profesor_seccion` (`profesor_id`,`seccion_id`),
  KEY `seccion_id` (`seccion_id`),
  CONSTRAINT `profesor_seccion_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `personal` (`id`) ON DELETE CASCADE,
  CONSTRAINT `profesor_seccion_ibfk_2` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_seccion`
--

LOCK TABLES `profesor_seccion` WRITE;
/*!40000 ALTER TABLE `profesor_seccion` DISABLE KEYS */;
INSERT INTO `profesor_seccion` VALUES (8,7,18,1,'2026-01-29','2026-01-30 00:21:06'),(9,7,19,1,'2026-02-12','2026-02-12 15:36:12');
/*!40000 ALTER TABLE `profesor_seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `revoked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `token_hash` (`token_hash`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (320,25,'$2b$10$m6F.2/RCFGPh6YLjgFoLyeqIzeDTIBzK2djXELpNYrE6X/L7.Mojm','2026-02-19 11:22:47','2026-02-12 15:22:47',0);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `representantes`
--

DROP TABLE IF EXISTS `representantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `representantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `sexo` enum('Masculino','Femenino','Otro') DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `relacion` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) NOT NULL,
  `ocupacion` varchar(100) DEFAULT NULL,
  `direccion` text,
  `tipo_cedula` varchar(20) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula_UNIQUE` (`cedula`),
  KEY `idx_representantes_cedula` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `representantes`
--

LOCK TABLES `representantes` WRITE;
/*!40000 ALTER TABLE `representantes` DISABLE KEYS */;
INSERT INTO `representantes` VALUES (71,'pepe','grillo',NULL,NULL,'papa','maria@email.com','04121234567','Ingeniero',NULL,'V','30233232','2025-11-16 07:18:28'),(101,'Maria','Gomez','Femenino','1997-09-20','Madre',NULL,'0414578963',NULL,NULL,'V','30493727','2026-02-12 15:27:31');
/*!40000 ALTER TABLE `representantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secciones`
--

DROP TABLE IF EXISTS `secciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grado_id` int NOT NULL,
  `nombre` varchar(10) NOT NULL,
  `capacidad_maxima` int DEFAULT '30',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_grado_seccion` (`grado_id`,`nombre`),
  CONSTRAINT `secciones_ibfk_1` FOREIGN KEY (`grado_id`) REFERENCES `grados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secciones`
--

LOCK TABLES `secciones` WRITE;
/*!40000 ALTER TABLE `secciones` DISABLE KEYS */;
INSERT INTO `secciones` VALUES (18,15,'A',40,'2026-01-30 00:10:37','2026-01-30 00:10:37'),(19,16,'A',40,'2026-02-12 15:35:30','2026-02-12 15:35:30');
/*!40000 ALTER TABLE `secciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` enum('administrador','usuario') NOT NULL DEFAULT 'usuario',
  `ultimo_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (25,'Juan Vera 22','juanvera','juanvera22@gmail.com','$2b$10$p6Nz/Tkt3xySJoTfAYIsk.YMc47TArP1djkVFLUYvPkIx/mpgP8Ee','administrador','2026-02-12 15:22:47'),(27,'Pepito','pepito123','pepito123@gmail.com','$2b$10$nzfMDc8j5q.EpnKk7.9REOqlRJL6YYufu44KzZc9Rj9IfgrOrzX0O','usuario','2026-01-29 21:52:09'),(28,'Juan','juan123321','juanvera432@gmail.com','$2b$10$xbCKAsbTeMqlQ3XbXYmVq.wyiMW/yRRtPSh.j9ngHSCKc3vXBL8KS','usuario','2026-01-29 22:11:07'),(29,'Juan','prueba123','ejemplo12@gmail.com','$2b$10$b/nTJO.hedJDGed/pUdinOgGuW7w8NKLa5UaXHOSyPfmdtx6PYLqK','administrador','2026-02-12 15:24:34');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-24 14:03:32
