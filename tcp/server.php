<?php

$host = 'localhost';
$port = 8080;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if (!$socket) {
    die('socket_create() failed: ' . socket_strerror(socket_last_error()));
}

if (!socket_bind($socket, $host, $port)) {
    die('socket_bind() failed: ' . socket_strerror(socket_last_error()));
}

if (!socket_listen($socket, 10)) {
    die('socket_listen() failed: ' . socket_strerror(socket_last_error()));
}

$clientSocket = socket_accept($socket);
if (!$clientSocket) {
    die('socket_accept() failed: ' . socket_strerror(socket_last_error()));
}

$message = socket_read($clientSocket, 1024);
if (!$message) {
    die('socket_read() failed: ' . socket_strerror(socket_last_error()));
}

echo $message;

$response = 'Hello from the server!';
if (!socket_write($clientSocket, $response, strlen($response))) {
    die('socket_write() failed: ' . socket_strerror(socket_last_error()));
}

socket_close($clientSocket);
socket_close($socket);