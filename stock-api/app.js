require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');

const Product = require('./src/models/Product');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// EJS
app.set('view engine','ejs');

app.set(
    'views',
    path.join(__dirname,'src/views')
);

// MongoDB
mongoose.connect(
    process.env.MONGO_URI
)
.then(()=>console.log("Mongo conectado"))
.catch(err=>console.log(err));


// Rutas
app.use(
    '/api/auth',
    require('./src/routes/authRoutes')
);

app.use(
    '/api/productos',
    require('./src/routes/productRoutes')
);


// Dashboard
app.get('/dashboard',async(req,res)=>{

    try{

        const productos=await Product.find();

        res.render(
            'dashboard',
            {productos}
        );

    }catch(error){

        res.send(error);

    }

});


// CRON  NOTA!!!!!--->(cambiar a cada 30 segundos para la exposicion)
cron.schedule('*/15 * * * * *',async()=>{

    console.log("Revisando inventario...");

    try{

        const productos=await Product.find({

            estadoAlerta:false,

            $expr:{
                $lt:[
                    "$cantidad",
                    "$umbralMinimo"
                ]
            }

        });

        for(let producto of productos){

            console.log(
                `[ALERTA SMS]: El producto ${producto.nombre} tiene stock bajo`
            );

            await Product.findByIdAndUpdate(
                producto._id,
                {
                    estadoAlerta:true
                }
            );

        }

    }
    catch(error){

        console.log(error);

    }

});


// puerto servidor
const PORT=3000;

app.listen(PORT,()=>{

    console.log(
        `Servidor iniciado en puerto ${PORT}`
    );

});