<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "turismo_queretaro");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$id = intval($_POST['id'] ?? 0);

if ($id > 0) {
    $sql = "DELETE FROM comentarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
}

header("Location: admin-comentarios.php");
exit();
?>