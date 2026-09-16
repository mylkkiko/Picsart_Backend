const express = require('express');
const {readData, writeData} = require('../utils/fileDB');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secret';

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res 
                .status(400)
                .json({error: "username and password are required"});
    }
    const users = await readData('users.json');
    if(users.find((u) => u.username === username)) {
        return res.status(409).json({error: "Username already exists"});
    }

    const usersIds = users.map(u => u.id);

    const newUser = {
        id: users.length ? Math.max(...usersIds) + 1 : 1,
        username,
        passwordHash: await bcrypt.hash(password, 10),
        role: 'customer',
    };

    users.push(newUser);
    await writeData('users.json', users);

    res
        .status(201)
        .json({id: newUser.id, username: newUser.username, role: newUser.role});
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res 
                .status(400)
                .json({error: "username and password are required"});
    }
    const users = await readData('users.json');
    const user = users.find((u) => u.username === username);
    if(!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res  
            .status(401)
            .json({error: "Invalid credentials"});
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username, 
            role: user.role,
        },
        SECRET,
        {expiresIn: '2h'},
    );

    res.json({ token });
});

module.exports = router;