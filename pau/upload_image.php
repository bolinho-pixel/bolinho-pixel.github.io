<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $imageData = $_POST['imageData'];
    $imageName = $_POST['imageName'];
    $imageParts = explode(";base64,", $imageData);
    $imageTypeAux = explode("image/", $imageParts[0]);
    $imageType = $imageTypeAux[1];
    $imageBase64 = base64_decode($imageParts[1]);

    $randomId = uniqid();
    $imageExtension = pathinfo($imageName, PATHINFO_EXTENSION);
    $imagePath = "uploads/img_{$randomId}.{$imageExtension}";

    if (file_put_contents($imagePath, $imageBase64) !== false) {
        echo "pau/{$imagePath}";
    } else {
        http_response_code(500);
        echo "Erro ao salvar a imagem.";
    }
} else {
    http_response_code(400);
    echo "Método de requisição inválido.";
}
?>
