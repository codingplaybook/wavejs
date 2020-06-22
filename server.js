const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
//const uploader = require('./config/cloudinaryConfig');
//const cloudinaryConfig = require('./config/cloudinaryConfig');

require('./db/db');
require('dotenv').config();

const dbCheck = require('./db/dbCheck');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
dbCheck.checkDate();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client', 'build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// note, io(<port>) will create a http server for you
/*const io = require('socket.io')(8000);

io.on('connection', (socket) => {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', (from, msg) => {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
});*/