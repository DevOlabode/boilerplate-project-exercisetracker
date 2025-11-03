const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const User = require('./models/user')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exercise-tracker');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async(req, res)=>{
  const {username} = req.body;
  const user = new User(username);
  await user.save();
  res.send(user);
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})