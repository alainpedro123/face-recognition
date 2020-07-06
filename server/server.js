const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const database = knex({
    client: 'mysql',
    connection: {
        host: '3306',
        user: 'root',
        password: '',
        database: 'face-recognition'
    }
});

database.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
    //res.send("this is working");
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            entries: 0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length - 1])
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        found = true;
        if (user.id === id) {
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})

app.put('/image', (req, res) => {  // everytime they submit we want to increase their entries
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        found = true;
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})

app.listen(3000, () => {
    console.log("app is running on port 3000");
})




/* API DESIGN

/ --> res = this is working
/sigin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/


/*
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}*/