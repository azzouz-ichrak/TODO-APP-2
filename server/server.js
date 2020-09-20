
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mysql = require('mysql')

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 1 }));


// database
//const db = require("./models");
//const Role = db.role;

// setup database
db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tekrutest'
  })

//db.sequelize.sync();
/*
db.sequelize.sync({ force: 1 })
  .then(() => {
    console.log(`Database & tables created!`);
  });
  */
const todoRouter = require('./routes/todo.routes')
app.get("/", (req, res) => {
  res.json({ message: "Test application." });
});
app.use('/todos', todoRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
