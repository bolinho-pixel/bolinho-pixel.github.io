<?php
$json_url = "https://raw.githubusercontent.com/sadgrlonline/yesterlinks/main/yesterlinks.json";
$json_data = file_get_contents($json_url);

if ($json_data === false) {
    die("Erro ao recuperar os dados JSON.");
}

$data_array = json_decode($json_data, true);

if ($data_array === null) {
    die("Erro ao decodificar o JSON.");
}

$random_index = mt_rand(0, count($data_array) - 1);
$random_site = $data_array[$random_index];

if (isset($random_site['url']) && !empty($random_site['url'])) {
    header("Location: " . $random_site['url']);
    exit;
} else {
    die("URL inválida no JSON.");
}
?>
