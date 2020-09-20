'use strict';

const Todo = require('../models/todo.models');

exports.findAll = function(req, res) {
  Todo.findAll(function(err, todo) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', todo);
    res.send(todo);
  });
};


exports.create = function(req, res) {
    const new_todo = new Todo(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Todo.create(new_todo, function(err, todo) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Todo added successfully!",data:todo});
        });
    }
};


exports.findById = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (err)
        res.send(err);
        res.json(todo);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Todo.update(req.params.id, new Todo(req.body), function(err, todo) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Todo successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
  Todo.delete( req.params.id, function(err, todo) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Todo successfully deleted' });
  });
};