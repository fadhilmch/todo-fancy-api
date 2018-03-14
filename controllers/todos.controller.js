const Todo = require('../models/todos.model');

module.exports = {
    findAll: (req, res) => {
        Todo.find()
            .exec()
            .then(data => {
                return res.status(200).json({
                    message: "Succeed get all todos data",
                    data
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: "Failed get all todos data",
                })
            })
    },
    findById: (req, res) => {
        Todo.findOne({
            _id: req.params.id
        })
        .exec()
        .then(data => {
            return res.status(200).json({
                message: "Succeed get todo data by id",
                data
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: "Failed to get todo data by Id"
            })
        })
    },
    create: (req, res) => {
        Todo.create({
            text: req.body.text,
            due_date: req.body.due_date,
            starred: req.body.starred,
        },(err, data) => {
            console.log("masuk")
            if(err){
                return res.status(400).json({
                    message: "Failed to create todo",
                    err
                })
            }
            return res.status(200).json({
                message: "Succeed to create todo"
            })
        })

    },
    update: (req, res) => {
        Todo.findOneAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        .then((data) => {
            return res.status(200).json({
                message: "Succeed to update todo data",
                data
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: "failed to update data"
            })
        })
    },
    destroy: (req,res) => {
        Todo.findByIdAndRemove(
            req.params.id
        )
        .then(() => {
            return res.status(200).json({
                message: "Succeed to delete data"
            })
        })
        .catch(() => {
            return res.status(400).json({
                message: "Failed to delete data"
            })
        })
    }
}
