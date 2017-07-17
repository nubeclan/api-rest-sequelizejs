-- author: Angel Céspedes Quiroz
-- Skype: acq1305
-- Linkedin: https://bo.linkedin.com/in/acq1305

CREATE DATABASE admtsa;
use admtsa;

CREATE TABLE configuracion(
 	codE varchar(10),
	Ippublica varchar(20),
	Ipprivada varchar(20),
	cantidadTotal integer,
	cantidadSellado integer,
	fechaFin datetime,
	tipo varchar(20),
	estadoServicio int,
	PRIMARY KEY(codE)
);

CREATE TABLE usuario(
	id int,
	usuario varchar(10),
	contrasenia varchar(15),
  codEC varchar(10),
	estado int,
  PRIMARY KEY(id),
	FOREIGN KEY(codEC) references configuracion(codE)
);

CREATE TABLE sellado(
  id int AUTO_INCREMENT,
  codhash varchar(255),
  fecha datetime,
  tipo varchar(1),
  idU int,
  PRIMARY KEY(id),
  FOREIGN KEY(idU) REFERENCES usuario(id)
);

CREATE TABLE log(
	id int AUTO_INCREMENT,
	fecha datetime,
	descripcion varchar(50),
  PRIMARY KEY(id)
);

INSERT INTO `log` ( `fecha`, `descripcion`) VALUES
('2017-06-27 03:17:20', 'iniciado'),
('2017-06-27 14:39:42', 'detenido');

INSERT INTO `configuracion` (`codE`, `Ippublica`, `Ipprivada`, `cantidadTotal`, `cantidadSellado`, `fechaFin`, `tipo`, `estadoServicio`) VALUES
('adsib', '14.14.54.54', '200.24.25.12', 50, 0, NULL, 'publico', 1),
('gaml', '54.56.54.1', '200.25.25.25', NULL, 0, '2017-06-30 00:00:00', 'publico', 1);

INSERT INTO `usuario` (`id`, `usuario`, `contrasenia`, `codEC`, `estado`) VALUES
(1, 'acq1305', '123456', 'adsib', 1),
(5, 'jcca', '123456', 'adsib', 1);

INSERT INTO `sellado` (`codhash`, `fecha`, `tipo`, `idU`) VALUES
('VBJGFHGIJIGIGH', '2017-06-27 04:12:22', 'S', 1),
('JGJJFHFFYFYHHJ', '2017-06-27 07:19:19', 'S', 1),
('HJGHJGGFYFFYFY', '2017-06-27 04:17:17', 'S', 5),
('KJGKJGJKGGJHJK', '2017-06-27 06:17:21', 'S', 1);
