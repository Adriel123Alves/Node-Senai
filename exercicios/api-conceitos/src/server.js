const express = require('express');
const cors = require('cors'); // <-- Importação do CORS
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração dos middlewares
app.use(cors()); // <-- Ativando o CORS para permitir requisições de outras origens
app.use(express.json());

// Caminho
const dataPath = path.join(__dirname, '../data.json');

const lerDados = () => {
    try {
        if (!fs.existsSync(dataPath)) {
            return [];
        }
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler o arquivo JSON:", error);
        return [];
    }
};

const salvarDados = (dados) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(dados, null, 4), 'utf8');
    } catch (error) {
        console.error("Erro ao salvar o arquivo JSON:", error);
    }
};

// GET todos
app.get('/', (req, res) => {
    const dados = lerDados();
    res.status(200).json(dados);
});

// GET id
app.get('/testes/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);
    const item = dados.find(t => t.id === id);

    if (!item) {
        return res.status(404).json({ mensagem: 'Registro não encontrado.' });
    }
    
    res.status(200).json(item);
});

// POST
app.post('/post/testes', (req, res) => {
    const dados = lerDados();
    const novoItem = req.body;
    const maiorId = dados.length > 0 ? Math.max(...dados.map(t => t.id)) : 0;
    novoItem.id = maiorId + 1;

    dados.push(novoItem);
    salvarDados(dados);

    res.status(201).json({ mensagem: 'Registro criado com sucesso!', item: novoItem });
});

// PUT id
app.put('/put/testes/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);
    const index = dados.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Registro não encontrado para atualização.' });
    }

    const itemAtualizado = { ...dados[index], ...req.body, id: id };
    dados[index] = itemAtualizado;
    
    salvarDados(dados);

    res.status(200).json({ mensagem: 'Registro atualizado com sucesso!', item: itemAtualizado });
});

// DELETE id
app.delete('/del/testes/:id', (req, res) => {
    const dados = lerDados();
    const id = parseInt(req.params.id);
    const index = dados.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Registro não encontrado para exclusão.' });
    }

    const itemRemovido = dados.splice(index, 1);
    salvarDados(dados);

    res.status(200).json({ mensagem: 'Registro deletado com sucesso!', item: itemRemovido[0] });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acessando dados em: ${dataPath}`);
});