const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 4000;

//bodyParser
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//cors
app.use(cors());

// app.use('/music', express.static('audios'))

//handlers
const handlers = require('./handlers')

app.get('/getAllMusic', handlers.getAllMusic)
app.post('/addToFav/:audioId',handlers.addToFav)
app.delete('/removeFromFavs/:audioId',handlers.removeFromFavs)
app.get('/getAllFavs',handlers.getAllFavs)

//Listen
app.listen(port, () => {
    console.log("I am live at " + port)
})
