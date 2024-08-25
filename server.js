// Importando o Express e outros módulos necessários
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();

// Configurando o middleware para interpretar JSON
app.use(express.json());

// Configurando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpharomeu',
  database: 'Anihon_Go'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Definindo uma rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
}); // Fechando parêntese

// Rota de registro de usuário
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  // Hash da senha
  const hashedPassword = bcrypt.hash(password, 10);
  // Criar usuário no banco de dados
  connection.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [username, hashedPassword, email], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Erro ao criar usuário' });
    } else {
      res.send({ message: 'Usuário criado com sucesso' });
    }
  });
});

// Rota de login de usuário
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Buscar usuário no banco de dados
  connection.query(`SELECT * FROM users WHERE username = ?`, [username], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Erro ao buscar usuário' });
    } else if (results.length === 0) {
      res.status(401).send({ message: 'Usuário não encontrado' });
    } else {
      const user = results[0];
      // Verificar senha
      const isValid = bcrypt.compare(password, user.password);
      if (isValid) {
        res.send({ message: 'Login realizado com sucesso' });
      } else {
        res.status(401).send({ message: 'Senha incorreta' });
      }
    }
  });
});