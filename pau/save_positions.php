<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $positions = $_POST['positions'];
    if (file_put_contents('positions.json', $positions) !== false) {
        echo "Posições salvas com sucesso!";
    } else {
        echo "Erro ao salvar posições.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
