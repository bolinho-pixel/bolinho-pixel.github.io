<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (file_exists('positions.json')) {
    $positions = file_get_contents('positions.json');
    echo $positions;
} else {
    echo json_encode([]);
}
?>
