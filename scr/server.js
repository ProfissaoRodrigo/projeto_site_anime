// Importando os módulos necessários
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');

// Configurando o dotenv para carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configurando o middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configurando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alpharomeu',
  database: 'Anihon_Go'
});

const corsOptions = {
  origin: 'http://localhost:3000/login', // Permite apenas requisições da origem especificada
  methods: 'GET,POST', // Métodos HTTP permitidos
  allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
};

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

// Rota de registro de usuário
app.post('/signup', [
  check('email', 'Email is required').not().isEmpty(),
  check('nickname', 'Nickname is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, nickname, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing da senha

  // Criar usuário no banco de dados
  connection.query(`
    INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)
  `, [email, nickname, hashedPassword], (err, results) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).send({ message: 'Erro ao criar usuário' });
    } else {
      const userId = results.insertId;
      res.send({ message: 'Usuário criado com sucesso' });
    }
  });
});

// Rota de login de usuário
app.post('/login', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Erro de validação', errors: errors.array() });
  }

  const { email, password } = req.body;

  connection.query(`
    SELECT * FROM users WHERE email = ?
  `, [email], (err, results) => {
    if (err) {
      console.error('Erro ao consultar usuário:', err);
      res.status(500).send({ message: 'Erro interno do servidor' });
    } else if (results.length === 0) {
      res.status(404).send({ message: 'Usuário não encontrado' });
    } else {
      const user = results[0];
      const hashedPassword = user.password;
      const isValid = bcrypt.compareSync(password, hashedPassword);
      if (!isValid) {
        res.status(401).send({ message: 'Senha inválida' });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.send({ token: token });
      }
    }
  });
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
