// PREGUNTA 19 -- EXAMEN UNIDAD 3
// TENGO QUE HACER:
/*
GET /usuarios
POST /usuarios
GET /usuarios/:id
DELETE /usuarios/:id

Los usuarios deben tener 
-- id, nobre, email, edad, activo --

No especifica si con base de datos real o no asi que supongo que va a ser igual con un array

Y no dice nada de mensajes de error en la pregunta pero dice buenas practicas asi que los voy a poner anyways
*/

const express = require('express');
const app = express();

app.use(express.json());

// Array de usuarios
let usuarios = [];
let nextId = 1;

// Validacion de los datos
function validarUsuario(req, res, next) {
    const { nombre, email, edad, activo } = req.body;

    if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ error: "Nombre inválido" });
}

    if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email inválido" });
}

    if (edad === undefined || typeof edad !== "number" || edad < 0) {
    return res.status(400).json({ error: "Edad inválida" });
}

    if (activo === undefined || typeof activo !== "boolean") {
    return res.status(400).json({ error: "Activo debe ser true o false" });
}

    next();
}

// Acciones
// GET de tods los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// GET de usuarios por ID
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
}

    res.json(usuario);
});

// POST de usuaris
app.post('/usuarios', validarUsuario, (req, res) => {
    const nuevoUsuario = {
    id: nextId++,
    ...req.body
};

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Patch para actualizar usuario (Prueba)
// mi idea era sobreescribirlo con otro POST por encima, pero practicando antes en otro ejercicio vi que se podia hacer con patch
app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
}

    const { nombre, email, edad, activo } = req.body;

    if (nombre !== undefined) usuario.nombre = nombre;
    if (email !== undefined) usuario.email = email;
    if (edad !== undefined) usuario.edad = edad;
    if (activo !== undefined) usuario.activo = activo;

res.json(usuario);
});


// DELETE de usuarios
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
}

    usuarios.splice(index, 1);
    res.json({ mensaje: "Usuario eliminado" });
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});