const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/top3', db.getThree)
app.get('/orderID/:id', db.getDataById)
app.post('/users', db.createNEW)
app.put('/users/:id', db.updateRC)
app.delete('/users/:id', db.deleteID)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
