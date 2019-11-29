//all modules
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const path = require('path')

//Init nexmo

const nexmo = new Nexmo({
  apiKey: '9e42a752',
  apiSecret: 'dSAb2aIiPKaXVP5l',
});



//Init app
const app = express();

//path setting
const viewpath = path.join(__dirname,'/templates/views')
const partialpath = path.join(__dirname,'/templates/partials')


//public folder setup
app.use(express.static(__dirname+'/public'))

//engine setting
app.set('view engine','hbs');
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//Index route
app.get('/',(req,res) => {
    res.render('index')
})

app.post('/',(req,res) => {
    
    const from = 'Nexmo';
    const to = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(from, to, text);
})

//define Port
const port = 3000

//Server
const server = app.listen(port,() => {
    console.log("Server started on port number 3000")
})