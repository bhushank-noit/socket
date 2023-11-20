<?php

$host = 'localhost';
$port = 8080;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if (!$socket) {
    die('socket_create() failed: ' . socket_strerror(socket_last_error()));
}

if (!socket_connect($socket, $host, $port)) {
    die('socket_connect() failed: ' . socket_strerror(socket_last_error()));
}

$message = 'Hello from the client!';
if (!socket_write($socket, $message, strlen($message))) {
    die('socket_write() failed: ' . socket_strerror(socket_last_error()));
}

$response = socket_read($socket, 1024);
if (!$response) {
    die('socket_read() failed: ' . socket_strerror(socket_last_error()));
}

echo $response;

socket_close($socket);
