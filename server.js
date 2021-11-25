const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');


//Connect Database
connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))



const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){

app.use(express.static('client/build'))

app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index/html')))

}

app.listen(PORT , () => console.log(`Server started on port ${PORT}`))

app.get('/', (req , res) => res.json({msg : 'Hi there'}))


