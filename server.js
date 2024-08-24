// Importando o Express e outros módulos necessários
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configurando o middleware para interpretar JSON
app.use(express.json());

// Configurando a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'nome_do_banco_de_dados'
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
});
