const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 5500;

const sequelize = new Sequelize('phishing', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definindo o modelo do usuário
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para inserir dados no banco de dados
app.post('/add-user', async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password })
    .then(() => {
      res.send('Usuário cadastrado com sucesso!');
      
    })
    .catch((error) => {
      console.error('Erro ao cadastrar o usuário:', error);
      res.status(500).send('Erro no servidor');
    });
  
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
