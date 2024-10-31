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

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    }else{
        users = await prisma.user.findMany()
    }
   
    res.status(200).json(users)

});

//update
app.put('/usuarios/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
});


//delete

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete ({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuario deletado com sucesso'})
})
app.listen(3000) 