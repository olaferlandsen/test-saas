CREATE TABLE IF NOT EXISTS `alumnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `alumno_curso` (
  `cursos_id` int(11) NOT NULL,
  `alumnos_id` int(11) NOT NULL,
  PRIMARY KEY (`cursos_id`,`alumnos_id`),
  KEY `fk_table2_alumnos1_idx` (`alumnos_id`),
  CONSTRAINT `fk_table2_alumnos1` FOREIGN KEY (`alumnos_id`) REFERENCES `alumnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_table2_cursos` FOREIGN KEY (`cursos_id`) REFERENCES `cursos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `alumno_pruebas` (
  `alumnos_id` int(11) NOT NULL,
  `pruebas_id` int(11) NOT NULL,
  `nota` float DEFAULT NULL,
  PRIMARY KEY (`alumnos_id`,`pruebas_id`),
  KEY `fk_table1_pruebas1_idx` (`pruebas_id`),
  CONSTRAINT `fk_table1_alumnos1` FOREIGN KEY (`alumnos_id`) REFERENCES `alumnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_pruebas1` FOREIGN KEY (`pruebas_id`) REFERENCES `pruebas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profesor_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `profesores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pruebas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `cursos_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`cursos_id`),
  KEY `fk_pruebas_cursos1_idx` (`cursos_id`),
  CONSTRAINT `fk_pruebas_cursos1` FOREIGN KEY (`cursos_id`) REFERENCES `cursos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
