const express = require('express');
const router = express.Router()

///Requiring models
const todoModel = require('../DB/todo')

///GET methods
router.get("/unfinished-todo", (req, res) => {

    todoModel.find({ finished: false }).
        then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(400).send(err.message)
        })
})

router.get("/getall-finished", (req, res) => {

    todoModel.find({ finished: true }).
        then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(400).send(err.message)
        })
})

///POST methods
router.post("/todo-post", (req, res) => {
    todoModel.create(req.body).
        then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(400).send(err.message);
        })
})

///PUT methods
router.put("/update", (req, res) => {

    const { id, date, time, title, body, finished } = req.body

    todoModel.findOneAndUpdate({ _id: id }, {
        date, time, title, body, finished
    }, {
        useFindAndModify: true,
        new: true
    }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(400).send(err.message)
    })
})

router.put("/finish", (req, res) => {

    todoModel.findOneAndUpdate(
        { _id: req.body.id },
        { finished: true },
        {
            useFindAndModify: true,
            new: true
        }
    ).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(400).send(err.message)
    })
})

router.put("/resume", (req, res) => {

    todoModel.findOneAndUpdate(
        { _id: req.body.id },
        { finished: false },
        {
            useFindAndModify: true,
            new: true
        }
    ).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(400).send(err.message)
    })
})

///DELETE methods
router.delete("/delete", (req, res) => {

    todoModel.findOneAndDelete({ _id: req.body.id }).
        then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err.message)
        })
})

module.exports = router;