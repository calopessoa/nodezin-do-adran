const express = require('express');
const { connection } = require('./connection');

const app = express();

app.use(express.json());

// get: busca informações no server
// post: inserir infos 
// put: atualizar infos
//patch: atualizar partes de infos
// delete: excluir infos

app.get( '/authors', async (_req, res) => {
    const query = 'SELECT * FROM authors';

    const [authors] = await connection.execute(query);

    return res.status(200).json(authors)
});

app.get('/authors/:name', async (req, res) => {
    const query = 'SELECT * FROM authors'

    const { name } = req.params;
    const [authors] = await connection.execute(query, [name])

    if (!authors) return res.status(404).json({ mensagem: 'autor não encontrado' });

    const filtered = authors.filter(author => author.name.includes(name));

    console.log(filtered)

    if (!filtered) return res.status(404).json({ mensagem: 'autor não encontrado' });


    return res.status(200).json(filtered);
});

app.post('/authors', async (req, res) => {
    const query = 'INSERT INTO authors (name, countries_id) VALUES (?, ?)';

    const { name, countriesId } = req.body;


    if (!name || !countriesId) return res.status(400).json({ mensagem: 'Dados inválidos' })


    await connection.execute(query, [name, countriesId]);

    return res.status(201).end();
})

app.listen(3000, () => console.log('Rodando na porta 3000'));
