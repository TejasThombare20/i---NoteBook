const getconnection = require('./db')
const express = require('express')
const bodyParser = require("body-parser")
var cors = require('cors')

getconnection();
const app = express()
 const port = 5001;
 app.use(cors())
 app.use(bodyParser.json());

 app.get('/', (req, res) => {
   res.send('Hello World!')
 })

//  app.get('/signup', (req, res) => {
//    res.send('sign up the account')
//  })

//  app.get('/login', (req, res) => {
//    res.send('login the account')
//  })
 app.use(express.json()); 
 app.use('/api/auth', require("./Routes/Authentication"))
 app.use('/api/notes',require("./Routes/Notes"))

 app.listen(port, () => {
   console.log(`Server is running  on port http://localhost:${port}`)
 })



      
 