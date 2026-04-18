// PREGUNTA 14 -- EXAMEN UNIDAD 3
// TENGO QUE HACER:
/*
GET /juegos
POST /juegos
GET /juegos/:id
DELETE /juegos/:id

-Como en una tarea previa-


Los juegos deben tener 
-- id, titulo, plataforma --

Sin base de datos real nomas con un array de objetos sirve

E instalar las librerias porque luego se me olvida y lloro si no jala

Y si no existe error 404 con mensaje "Juego no encontrado"
*/

const express = require('express');
const app = express();

app.use(express.json());

// array de juegos
let juegos = [
    {id: 1, titulo: "Zelda", plataforma: "Nintendo Switch" },
    {id: 2, titulo: "Mario", plataforma: "Nintendo Switch" },
    {id: 3, titulo: "Resident Evil", plataforma: "Pc" },
    {id: 4, titulo: "Halo", plataforma: "Xbox" },
    {id: 5, titulo: "The Last of Us", plataforma: "PlayStation" },
];

// Posts
// Get /juegos
app.get('/juegos', (req, res) => {
    res.json(juegos);
});

// Post /Juegos
app.post('/juegos', (req, res) =>{
    const { titulo, plataforma } = req.body;
    const nuevoJuego = {
        id: juegos.length ? juegos[juegos.length - 1].id + 1 : 1,
        titulo,
        plataforma
    };

    juegos.push(nuevoJuego);
    res.status(201).json(nuevoJuego);
});

// GET /juegos por ID
app.get('/juegos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const juego = juegos.find(j => j.id === id);

    if (!juego) {
        return res.status(404).json({ mensaje: "Juego no encontrado"});
    }

    res.json(juego);
});

// Delete /juegos por ID
app.delete('/juegos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = juegos.findIndex(j => j.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Juego no encontrado"});
    }

    juegos.splice(index, 1);
    res.json({ mensaje: "Juego eliminado"});
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http:/localhost:${PORT}`);
});