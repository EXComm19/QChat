const express = require('express')
const Datastore = require('nedb')
const hash = require('password-hash')
const path = require('path');

const app = express()
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({
  limit: '10gb'
}))
app.use(function(req,res){
    res.status(404).sendFile(path.join(__dirname+'/err.html'));
});

const msg_db = new Datastore("db/msg_database.db")
const user_db = new Datastore("db/user_database.db")

var username

msg_db.loadDatabase()
user_db.loadDatabase()

app.post('/reg', (request, response) => {
  const userdata = request.body
  const encrypass = hash.generate(userdata.password);
  userdata.password = encrypass
  user_db.insert(userdata)
  response.json(userdata)
})

app.post('/login', (request, response) => {
  const userdata = request.body
  username = userdata.username
  user_db.find({
    username
  }, function(err, userd) {
    for (item of userd) {
      if (hash.verify(userdata.password, item.password)) {
        response.json({
          auth: true,
          status: "logged",
          username
        })
        return;
      } else {
        response.json("Wrong password");
      }
    }
  })
})

app.post('/api', (request, response) => {
  const data = request.body
  data.timestamp = Date.now()
  data.username = username
  msg_db.insert(data)
  response.json(data)
})

app.get('/api', (request, response) => {
  msg_db.find({}, (err, data) => {
    if (err) {
      console.log(err)
      response.end()
      return
    }
    response.json(data)
  })
})
