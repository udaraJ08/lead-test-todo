const express = require('express')
const app = express()

const mongoose = require('mongoose')

///requiring routes
const baseRoute = require('./routes/baseRoute')
const todoRoute = require('./routes/todoRoute')

///MongoDB config
const URI = `mongodb+srv://sinisterMongo:sinister@cluster0.wiiar.mongodb.net/todo-master?retryWrites=true&w=majority`

///middlewares
app.use(express.json())

///Using routes
app.use(baseRoute)
app.use(todoRoute)


///server listening
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
        console.log("Server is listening !!!");
    })
}).catch(err => {
    console.log(err.message);
})

