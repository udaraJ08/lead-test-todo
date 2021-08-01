const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;