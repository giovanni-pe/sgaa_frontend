<?php
// URL del servidor backend
$backendUrl = 'http://localhost:7000';

// Obtiene la ruta de la solicitud
$requestUri = $_SERVER['REQUEST_URI'];

// Elimina el prefijo del proxy si es necesario
$proxyPrefix = '/proxy.php'; // Ajusta esto si tu proxy tiene un prefijo específico
$backendRequestUri = str_replace($proxyPrefix, '', $requestUri);

// Crea la URL completa para la solicitud al backend
$url = $backendUrl . $backendRequestUri;

// Inicializa una sesión cURL
$ch = curl_init($url);

// Define los encabezados
$headers = [];

// Copia los encabezados de la solicitud original
foreach (getallheaders() as $name => $value) {
    // Omite el encabezado 'Host', pero copia los demás
    if ($name !== 'Host') {
        $headers[] = "$name: $value";
    }
}

// Añade un User-Agent específico
$headers[] = 'User-Agent: PostmanRuntime/7.40.0';

// Captura el cuerpo de la solicitud si existe
$body = file_get_contents('php://input');

// Intenta decodificar el cuerpo de la solicitud si es JSON
$bodyData = json_decode($body, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    // Maneja el error de JSON y registra el error para depuración
    error_log('Error al decodificar JSON: ' . json_last_error_msg());
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'JSON inválido en el cuerpo de la solicitud.']);
    exit;
}

// Verifica si el token de autorización está en el cuerpo
if (isset($bodyData['authorization'])) {
    // Añade el token al encabezado Authorization si está en el cuerpo
    $headers[] = 'Authorization: ' . $bodyData['authorization'];
    // Si no deseas pasar el token en el cuerpo al backend, elimina el token del cuerpo
    unset($bodyData['authorization']);
}

// Actualiza el cuerpo de la solicitud después de eliminar el token (si es necesario)
$body = json_encode($bodyData);

// Configura las opciones de cURL para cualquier método HTTP
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']); // Mantiene el método original
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Sigue las redirecciones

// Deshabilitar la verificación de SSL para entornos de desarrollo
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Fuerza el uso de HTTP/1.1
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);

// Para métodos que soportan cuerpo, envía el cuerpo de la solicitud
if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'HEAD') {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Ejecuta la solicitud y captura la respuesta
$response = curl_exec($ch);

// Captura cualquier error
if (curl_errno($ch)) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => curl_error($ch)]);
    exit;
}

// Cierra la sesión cURL
curl_close($ch);

// Obtiene el código de respuesta HTTP
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Establece el código de respuesta HTTP en la respuesta del proxy
http_response_code($httpCode);

// Reenvía el encabezado de tipo de contenido como JSON
header('Content-Type: application/json');

// Añade encabezados CORS a la respuesta
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Manejo de solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // No necesitas más procesamiento para preflight
}

// Verifica si la respuesta es JSON y la decodifica
$responseData = json_decode($response, true);

if (json_last_error() === JSON_ERROR_NONE) {
    // Si la respuesta es JSON válida, la devuelve tal cual
    echo json_encode($responseData);
} else {
    // Si no es JSON válido, devuelve el texto original
    echo $response;
}
?>
