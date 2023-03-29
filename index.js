import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose.connect('mongodb+srv://root:root@cluster0.lesxivh.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(() => console.log('DB error'));
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server started');
});