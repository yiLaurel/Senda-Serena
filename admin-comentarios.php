<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "turismo_queretaro");

// Contar comentarios pendientes para el badge
$sql_count = "SELECT COUNT(*) as pendientes FROM comentarios WHERE aprobado = 0";
$result_count = $conn->query($sql_count);
$pendientes = $result_count->fetch_assoc()['pendientes'];

// Configuración de paginación
$porPagina = 10;
$pagina = $_GET['pagina'] ?? 1;
$inicio = ($pagina - 1) * $porPagina;

// Manejo de búsqueda
$busqueda = $_GET['busqueda'] ?? '';
$sql = "SELECT * FROM comentarios WHERE aprobado = 0";
if (!empty($busqueda)) {
    $busqueda = $conn->real_escape_string($busqueda);
    $sql .= " AND (nombre LIKE '%$busqueda%' OR comentario LIKE '%$busqueda%' OR email LIKE '%$busqueda%')";
}
$sql .= " ORDER BY fecha ASC LIMIT $inicio, $porPagina";

$result = $conn->query($sql);

// Obtener total para paginación
$total_result = $conn->query("SELECT COUNT(*) FROM comentarios WHERE aprobado = 0");
$total = $total_result->fetch_row()[0];
$paginas = ceil($total / $porPagina);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Administrar Comentarios</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
        }
        .comentario-pendiente { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin-bottom: 15px; 
            border-radius: 5px;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .comentario-acciones { 
            margin-top: 10px; 
            display: flex;
            gap: 10px;
        }
        .btn-aprobar { 
            background: #4CAF50; 
            color: white; 
            border: none; 
            padding: 8px 15px; 
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .btn-aprobar:hover {
            background: #45a049;
        }
        .btn-eliminar { 
            background: #f44336; 
            color: white; 
            border: none; 
            padding: 8px 15px; 
            border-radius: 3px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .btn-eliminar:hover {
            background: #d32f2f;
        }
        .no-comentarios { 
            color: #777; 
            font-style: italic; 
            padding: 20px;
            text-align: center;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }
        .search-form {
            margin-bottom: 20px;
        }
        .search-form input {
            padding: 8px;
            width: 300px;
            max-width: 100%;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .search-form button {
            padding: 8px 15px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .search-form button:hover {
            background: #0b7dda;
        }
        .pagination {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        .pagination a {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-decoration: none;
            color: #333;
        }
        .pagination a:hover {
            background: #f1f1f1;
        }
        .current-page {
            background: #4CAF50;
            color: white;
        }
        .badge {
            background: #f44336;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 0.8em;
            margin-left: 5px;
        }
        .logout-btn {
            padding: 8px 15px;
            background: #607d8b;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        .logout-btn:hover {
            background: #455a64;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Comentarios Pendientes de Aprobación <span class="badge"><?= $pendientes ?></span></h1>
        <a href="logout.php" class="logout-btn">Cerrar sesión</a>
    </div>

    <form method="GET" action="admin-comentarios.php" class="search-form">
        <input type="text" name="busqueda" placeholder="Buscar comentarios..." value="<?= htmlspecialchars($busqueda) ?>">
        <button type="submit">Buscar</button>
        <?php if (!empty($busqueda)): ?>
            <a href="admin-comentarios.php" style="margin-left: 10px;">Limpiar búsqueda</a>
        <?php endif; ?>
    </form>
    
    <?php if ($result->num_rows > 0): ?>
        <?php while($row = $result->fetch_assoc()): ?>
        <div class="comentario-pendiente">
            <p><strong>Nombre:</strong> <?= htmlspecialchars($row['nombre']) ?></p>
            <p><strong>Email:</strong> <?= htmlspecialchars($row['email']) ?></p>
            <p><strong>Página:</strong> <?= htmlspecialchars($row['pagina']) ?></p>
            <p><strong>Fecha:</strong> <?= date('d/m/Y H:i', strtotime($row['fecha'])) ?></p>
            <p><strong>Comentario:</strong><br><?= nl2br(htmlspecialchars($row['comentario'])) ?></p>
            
            <div class="comentario-acciones">
                <form action="aprobar_comentario.php" method="post" style="display: inline;">
                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                    <button type="submit" class="btn-aprobar">Aprobar</button>
                </form>
                
                <form action="eliminar_comentario.php" method="post" style="display: inline;">
                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                    <button type="submit" class="btn-eliminar">Eliminar</button>
                </form>
            </div>
        </div>
        <?php endwhile; ?>

        <div class="pagination">
            <?php for ($i = 1; $i <= $paginas; $i++): ?>
                <?php if ($i == $pagina): ?>
                    <span class="current-page"><?= $i ?></span>
                <?php else: ?>
                    <a href="?pagina=<?= $i ?><?= !empty($busqueda) ? '&busqueda='.urlencode($busqueda) : '' ?>"><?= $i ?></a>
                <?php endif; ?>
            <?php endfor; ?>
        </div>
    <?php else: ?>
        <p class="no-comentarios">No hay comentarios pendientes de aprobación.</p>
    <?php endif; ?>
</body>
</html>
<?php $conn->close(); ?>