const express = require('express'),
  router = express.Router();
//  const db = require("../models");

// get  lists
router.get('/todolist', function(req, res) {
  let sql = `SELECT * FROM todos`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "todo list"
    })
  })
});

// create new user
router.post('/newtodo', function(req, res) {
  let sql = `INSERT INTO todos(title, description, createdAt, finishedAt) VALUES (?)`;
  let values = [
    req.body.title,
    req.body.desctiption,
    req.body.createdAt,
    req.body.finishedAt
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New todo added successfully"
    })
  })
});

router.get('/finished', function(req, res) {
    let sql = `UPDATE todos SET finished = true WHERE id = ''+req.body.id+'''`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "todo finished successfully"
      })
    })
  });
module.exports = router;