const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const router = require('./router')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

const server = http.createServer(app)
const port = process.env.PORT || 4000
server.listen(port)

console.info(`The server is listening on port ${port}.`)
