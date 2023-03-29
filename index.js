import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt  from "bcrypt";

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js'

mongoose.connect('mongodb+srv://root:root@cluster0.lesxivh.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(() => console.log('DB error'));
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.post('/auth/register', registerValidation, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

       

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
         );

        const { paswordHash, ...userData } = user._doc;
        res.json({
           ...user._doc,
           token, 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        })
    }   
});

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server started');
});