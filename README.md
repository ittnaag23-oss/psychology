# Psychology - Aplicación de Chat IA con Autenticación

Aplicación de chat con integración de IA de Meta, Sistema de registro y login de usuarios.

## 📋 Características

- ✅ **Registro de usuarios** - Crear nueva cuenta
- ✅ **Login** - Iniciar sesión segura
- ✅ **Chat protegido** - Solo usuarios autenticados pueden usar el chat
- ✅ **Integración IA de Meta** - Conecta con APIs de IA
- ✅ **Respuestas locales** - Si la IA no está configurada, usa respuestas predeterminadas
- ✅ **Logout** - Salir de la sesión

## 🚀 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env`
   - Editar `.env` con tus credenciales de Meta IA:
     ```
     META_AI_API_URL=https://tu-api-meta.com/chat
     META_AI_API_KEY=tu_clave_secreta
     PORT=3000
     ```

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```

4. **Acceder a la aplicación:**
   - Abre `http://localhost:3000` en tu navegador
   - O abre directamente `loggim.html` en el navegador

## 📁 Archivos y Estructura

- **loggim.html** - Página de login
- **register.html** - Página de registro
- **index.html** - Chat principal (protegido)
- **server.js** - Backend Express con rutas de autenticación e IA
- **userDB.js** - Gestión de usuarios (almacenados en `users.json`)
- **package.json** - Dependencias del proyecto
- **.env** - Variables de entorno (crear desde .env.example)

## 🔐 Flujo de Autenticación

1. Usuario abre `loggim.html`
2. Si no tiene cuenta, va a `register.html` para crear una
3. Después de registrarse, inicia sesión
4. El servidor valida credenciales y responde con datos del usuario
5. El usuario se almacena en `localStorage`
6. Accede a `index.html` (chat protegido)
7. El botón "Salir" limpia la sesión

## 🤖 Integración con IA

- Los mensajes se envían al endpoint `/api/message`
- El servidor llama a la API de Meta IA configurada
- Si no hay API configurada, usa respuestas de salud mental predeterminadas
- El userId se incluye en cada llamada para rastrear usuarios

## 📝 Notas

- Los usuarios se almacenan en `users.json` (archivo local)
- Las contraseñas se guardan en texto plano (para producción, usar hash)
- El servidor usa CORS habilitado para llamadas desde el navegador

## 🔄 Próximas Mejoras

- Base de datos real (MongoDB, PostgreSQL)
- Hash de contraseñas con bcrypt
- Tokens JWT para autenticación
- Historial de conversaciones
- Recuperación de contraseña
