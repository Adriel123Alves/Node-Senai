import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pegarPalavra } from './db.js';

// Carrega as variáveis do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do Express
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Pasta onde vai ficar o Front-end

// Rota para pegar a palavra do seu banco de dados
app.get('/api/palavra', async (req, res) => {
    try {
        const resultado = await pegarPalavra();
        if (resultado) {
            res.json({ sucesso: true, palavra: resultado.palavra });
        } else {
            res.status(404).json({ sucesso: false, mensagem: "Nenhuma palavra encontrada." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ sucesso: false, mensagem: "Erro interno no servidor." });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
    console.log(`Acesse: http://localhost:${PORT}`);
});