const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const morgan = require('morgan')
const router = require('./router')

mongoose.connect('mongodb://localhost:27017/auth', {
  useCreateIndex: true,
  useNewUrlParser: true
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

const server = http.createServer(app)
const port = process.env.PORT || 4000
server.listen(port)

console.info(`The server is listening on port ${port}.`)
