const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8081; // Use a variável de ambiente ou a porta 3031 como padrão
const UserModel = require('./src/models/user');
require('dotenv').config();

// Conexão com o banco de dados
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado ao banco de dados.');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

app.use(express.json());

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, age } = req.body;

        // Encontrar e atualizar o usuário pelo ID no banco de dados
        const user = await UserModel.findByIdAndUpdate(userId, { name, email, age }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário atualizado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
});

// Rota para excluir um usuário pelo ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Encontrar e excluir o usuário pelo ID no banco de dados
        const user = await UserModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário excluído com sucesso!', user });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
});


// Rota para a página inicial (/home)
app.get('/home', (req, res) => {
    res.send('<h1> Home page </h1>');
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
    try {
        // Extrair os dados do corpo da requisição (vamos assumir que a requisição está em formato JSON)
        const { name, email, age } = req.body;

        // Criar um novo usuário usando o modelo
        const newUser = new UserModel({ name, email, age });

        // Salvar o usuário no banco de dados
        await newUser.save();

        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
});

// Rota para listar todos os usuários pelo ID
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Encontrar o usuário pelo ID no banco de dados
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erro ao listar usuário pelo ID:', error);
        res.status(500).json({ message: 'Erro ao listar usuário pelo ID.' });
    }
});


// Rota para outras requisições (caso a URL não corresponda a nenhuma rota definida)
app.use((req, res) => {
    res.status(404).send('<h1> Página não encontrada </h1>');
});

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
