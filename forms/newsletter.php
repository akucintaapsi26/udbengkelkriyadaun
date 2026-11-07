<?php
// Newsletter handler. Requires PHP with the mail() transport configured by the host.
header('Content-Type: text/plain; charset=UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  exit('Metode pengiriman tidak valid.');
}

$email = trim((string)($_POST['email'] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Alamat email tidak valid.');
}

$to = 'bengkelkriyadaun@gmail.com';
$subject = '=?UTF-8?B?' . base64_encode('Pelanggan baru berlangganan newsletter') . '?=';
$body = "Pendaftaran newsletter baru dari website UD Bengkel Kriya Daun 9996.\nEmail: {$email}\n";
$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: UD Bengkel Kriya Daun 9996 <bengkelkriyadaun@gmail.com>',
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . phpversion(),
];

if (!@mail($to, $subject, $body, implode("\r\n", $headers))) {
  http_response_code(500);
  exit('Email belum dapat dikirim oleh server. Pastikan layanan email/PHP mail pada hosting sudah diaktifkan.');
}

echo 'OK';
