CREATE DATABASE IF NOT EXISTS turismo_queretaro;
USE turismo_queretaro;

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    pagina VARCHAR(50) NOT NULL,
    aprobado TINYINT(1) DEFAULT 0
);