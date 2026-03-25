const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

// Middleware
app.use("/public-resource", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ARRAY DE DESTINOS
const destinos = [
  {
    nombre: "Playa Altata",
    precio: 500,
    dificultad: "Fácil",
    imagen: "/public-resource/imgs/playaT.png",
  },
  {
    nombre: "Monte Everest",
    precio: 5000,
    dificultad: "Alta",
    imagen: "/public-resource/imgs/montanaT.png",
  },
  {
    nombre: "Selva Lacandona",
    precio: 1200,
    dificultad: "Media",
    imagen: "/public-resource/imgs/selvaT.png",
  }
];


app.get("/informacion", (req, res) => {
  res.render("pages/informacion", {
    destinos,
    rutaActual: "/informacion",
  });
});


// HOME
app.get("/", (req, res) => {
  res.render("index", { rutaActual: "/" });
});

// DESTINOS
app.get("/informacion", (req, res) => {
  res.render("pages/informacion", {
    destinos,
    rutaActual: "/informacion",
  });
});

// CONTACTO
app.get("/perfil", (req, res) => {
  res.render("pages/perfil", {
    rutaActual: "/perfil",
    destinos,
  });
});

// POST FORM
app.post("/reservar", (req, res) => {
  console.log("Nueva reserva:");
  console.log(req.body);

  res.send("¡Gracias por contactarnos! 🌍");
});

// SERVER
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
