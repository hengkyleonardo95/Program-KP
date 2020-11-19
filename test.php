<?php
$servername = "43.247.39.90";
$username = "root";
$password = "ITSfhpi2019";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>