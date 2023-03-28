import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/auth/login', (req, res) => {
    const {login, password} = req.body;
    console.log(req.body);
    res.json({
        login: login,
        pass: password,
    });
});

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('server started');
});