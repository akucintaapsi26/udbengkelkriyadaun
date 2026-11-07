<?php
// Contact form handler. Requires PHP with the mail() transport configured by the host.
header('Content-Type: text/plain; charset=UTF-8');

function fail(string $message, int $status = 400): void
{
  http_response_code($status);
  echo $message;
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  fail('Metode pengiriman tidak valid.', 405);
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
  fail('Mohon lengkapi semua kolom formulir.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  fail('Alamat email tidak valid.');
}
if (strlen($name) > 160 || strlen($subject) > 200 || strlen($message) > 12000) {
  fail('Pesan terlalu panjang. Mohon ringkas isi formulir.');
}

$to = 'bengkelkriyadaun@gmail.com';
$safeSubject = trim(preg_replace('/[\r\n]+/', ' ', $subject));
$mailSubject = '=?UTF-8?B?' . base64_encode('[Website Bengkel Kriya Daun] ' . $safeSubject) . '?=';
$body = "Pesan baru dari website UD Bengkel Kriya Daun 9996\n\n"
  . "Nama: {$name}\nEmail: {$email}\nSubjek: {$safeSubject}\n\nPesan:\n{$message}\n";
$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: UD Bengkel Kriya Daun 9996 <bengkelkriyadaun@gmail.com>',
  'Reply-To: ' . $email,
  'X-Mailer: PHP/' . phpversion(),
];

if (!function_exists('mail') || !@mail($to, $mailSubject, $body, implode("\r\n", $headers))) {
  fail('Email belum dapat dikirim oleh server. Pastikan layanan email/PHP mail pada hosting sudah diaktifkan, lalu coba lagi.', 500);
}

echo 'OK';
