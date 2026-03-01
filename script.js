const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

// Configuração para ler dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Conexão com o Banco de Dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado ao banco de dados SQLite.');
});

// Criação da tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT UNIQUE,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
)`);

// Rota para processar o cadastro
app.post('/register', (req, res) => {
    const { cpf, name, email, password } = req.body;
    
    const sql = `INSERT INTO users (cpf, name, email, password) VALUES (?, ?, ?, ?)`;
    db.run(sql, [cpf, name, email, password], function(err) {
        if (err) {
            return res.send('Erro ao cadastrar: CPF ou E-mail já cadastrado.');
        }
        res.send('Cadastro realizado com sucesso! <a href="index.html">Voltar para o site</a>');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
