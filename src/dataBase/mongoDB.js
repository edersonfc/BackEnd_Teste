//connection with DataBase mongoose line down
var mongoose = require('mongoose');


//The database is remote
mongoose.connect('mongodb+srv://edersonfc7:Conectar123@cluster0.nkqtk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("MongoDB Conectado");
});


