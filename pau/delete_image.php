<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $imageUrl = $_POST['imageUrl'];
    $imagePath = $imageUrl;

    if (file_exists($imagePath)) {
        if (unlink($imagePath)) {
            echo "Imagem deletada com sucesso.";
        } else {
            http_response_code(500);
            echo "Erro ao deletar a imagem.";
        }
    } else {
        http_response_code(404);
        echo "Imagem não encontrada.";
    }
} else {
    http_response_code(400);
    echo "Método de requisição inválido.";
}
?>
