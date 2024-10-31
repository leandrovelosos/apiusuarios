import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
//mostra ao express que usamos json
app.use(express.json())


//salva os usuarios na variavel users
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
});

//responde com um json com todos os usuarios, rota de listagem 
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users)

});

app.listen(3000) 