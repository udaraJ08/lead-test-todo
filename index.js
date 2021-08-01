const express = require('express')
const app = express()

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

///requiring routes
const baseRoute = require('./routes/baseRoute')
const todoRoute = require('./routes/todoRoute')

///enable cors
app.use(cors())

///configuring dotenv
dotenv.config()
const env = process.env

///MongoDB config
const URI = `mongodb+srv://${env.USER}:${env.PASSWORD}@cluster0.wiiar.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`

///middlewares
app.use(express.json())

///Using routes
app.use(baseRoute)
app.use(todoRoute)

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }).
    then(result => {
        app.listen(process.env.PORT || 3000, (req, res) => {
            console.log("DB connected");
            console.log("Server is listening !!!");
        })
    }).catch(err => {
        res.send(err.message)
    })

