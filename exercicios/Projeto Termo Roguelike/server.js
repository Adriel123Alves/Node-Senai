import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';

import { pegarPalavra } from './db.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000; 
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get("/api/palavra", async (req, res) => { 
    try {
        const resultado = await pegarPalavra();
        res.json(resultado); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar palavra no banco de dados" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse o jogo em: http://localhost:${port}`);
});