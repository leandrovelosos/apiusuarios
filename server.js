import express from "express";

const app = express();
//mostra a express que usamos json
app.use(express.json())

const users = [];

//salva os usuarios na variavel users
app.post('/usuarios', (req, res) => {
    
    users.push(req.body)

    res.status(201).json(req.body)
});

//responde com um json com todos os usuarios, rota de listagem 
app.get('/usuarios', (req, res) => {
            res.status(200).json(users)

});

app.listen(3000) 