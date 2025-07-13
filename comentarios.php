<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "turismo_queretaro";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión: ' . $conn->connect_error
    ]));
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die(json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]));
}


$action = $_POST['action'] ?? '';

try {
    switch ($action) {
        case 'insert':
          
            $required = ['nombre', 'email', 'comentario', 'pagina'];
            foreach ($required as $field) {
                if (empty($_POST[$field])) {
                    throw new Exception("El campo $field es requerido");
                }
            }

           
            $nombre = $conn->real_escape_string(htmlspecialchars($_POST['nombre']));
            $email = $conn->real_escape_string(htmlspecialchars($_POST['email']));
            $comentario = $conn->real_escape_string(htmlspecialchars($_POST['comentario']));
            $pagina = $conn->real_escape_string(htmlspecialchars($_POST['pagina']));

          
            $sql = "INSERT INTO comentarios (nombre, email, comentario, pagina) 
                    VALUES ('$nombre', '$email', '$comentario', '$pagina')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Comentario enviado para aprobación'
                ]);
            } else {
                throw new Exception("Error al guardar el comentario: " . $conn->error);
            }
            break;

        case 'fetch':
            if (empty($_POST['pagina'])) {
                throw new Exception("Se requiere el parámetro 'pagina'");
            }

            $pagina = $conn->real_escape_string($_POST['pagina']);
            $sql = "SELECT * FROM comentarios 
                    WHERE pagina = '$pagina' AND aprobado = 1 
                    ORDER BY fecha DESC";
            
            $result = $conn->query($sql);
            $comentarios = [];

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $comentarios[] = [
                        'id' => $row['id'],
                        'nombre' => htmlspecialchars_decode($row['nombre']),
                        'email' => htmlspecialchars_decode($row['email']),
                        'comentario' => htmlspecialchars_decode($row['comentario']),
                        'fecha' => $row['fecha'],
                        'pagina' => htmlspecialchars_decode($row['pagina'])
                    ];
                }
            }

            echo json_encode([
                'success' => true,
                'comentarios' => $comentarios
            ]);
            break;

        default:
            throw new Exception("Acción no válida");
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} finally {
    $conn->close();
}