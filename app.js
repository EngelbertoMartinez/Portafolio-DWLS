const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

// conexión a MongoDB 
mongoose.connect("mongodb://localhost:27017/API")
.then(()=> console.log("MongoDB conectado"))
.catch(err => console.log(err))


// esquemita
const PracticaSchema = new mongoose.Schema({
    titulo: String,
    nivel: String
})

// modelito
const Practica = mongoose.model("Practica", PracticaSchema)


// READ
app.get("/api/practica", async (req,res)=>{
    const datos = await Practica.find()
    res.json(datos)
})


// READ - (Test de obtener cosas por ID :( )
app.get("/api/practica/:id", async (req,res)=>{

    try{

        const dato = await Practica.findById(req.params.id)

        if(!dato){
            return res.status(404).json({mensaje:"Registro no encontrado"})
        }

        res.json(dato)

    }catch{
        res.status(400).json({mensaje:"ID invalido"})
    }

})


// CREATE
app.post("/api/practica", async (req,res)=>{

    const {titulo, nivel} = req.body

    const nuevo = new Practica({
        titulo,
        nivel
    })

    await nuevo.save()

    res.json(nuevo)

})


// UPDATE
app.put("/api/practica/:id", async (req,res)=>{

    const {titulo, nivel} = req.body

    const dato = await Practica.findByIdAndUpdate(
        req.params.id,
        {titulo, nivel},
        {new:true}
    )

    if(!dato){
        return res.status(404).json({mensaje:"Registro no encontrado"})
    }

    res.json(dato)

})


// DELETE
app.delete("/api/practica/:id", async (req,res)=>{

    const dato = await Practica.findByIdAndDelete(req.params.id)

    if(!dato){
        return res.status(404).json({mensaje:"Registro no encontrado"})
    }

    res.json({mensaje:"Registro eliminado"})

})


app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
})