require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createUser, authenticateUser, initUsersDB } = require('./userDB');

const app = express();
const port = process.env.PORT || 3000;

initUsersDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de integración Meta IA con autenticación activo.');
});

// Rutas de autenticación
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  const result = createUser(email, password, name);
  return res.json(result);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email y contraseña requeridos' });
  }

  const result = authenticateUser(email, password);
  return res.json(result);
});

// Ruta de mensajes con IA
app.post('/api/message', async (req, res) => {
  const userMessage = req.body?.message;
  const userId = req.body?.userId || 'guest'; // Permitir sin userId, usar 'guest'

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Mensaje inválido' });
  }

  // No requerir autenticación para mensajes
  const apiUrl = process.env.META_AI_API_URL;
  const apiKey = process.env.META_AI_API_KEY;

  if (!apiUrl || !apiKey) {
    return res.json({ code: 'NOT_CONFIGURED', message: 'La integración de Meta IA no está configurada en el backend.' });
  }

  try {
    const response = await axios.post(
      apiUrl,
      { input: userMessage },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;
    let answer = '';

    if (typeof data === 'string') {
      answer = data;
    } else if (data.output_text) {
      answer = data.output_text;
    } else if (data.choices && data.choices[0]?.message?.content) {
      answer = data.choices[0].message.content;
    } else if (data.choices && data.choices[0]?.text) {
      answer = data.choices[0].text;
    } else {
      answer = JSON.stringify(data);
    }

    return res.json({ answer });
  } catch (error) {
    console.error('Error calling Meta IA:', error?.response?.data || error.message || error);
    return res.status(500).json({ error: 'Error al comunicarse con la IA de Meta.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
