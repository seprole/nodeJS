const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const bodyParser = require('body-parser');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('mongoDB Connected..'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World!!')
})


app.post('/register', (req, res) => {

  //サインアップする時必要な情報をデータベースに格納する

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})