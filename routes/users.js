const express = require('express');
const router = express.Router();
const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').post(async (req, res) => {
  req.body.salt = bcrypt.genSaltSync(10);
  req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
  delete req.body.password;
  const user = await db.users.add(req.body);
  res.status(201).send(user);
});

router.route('/login').post(async (req, res) => {
  const user = await db.users.getByEmail(req.body.email);
  if (!user) {
    res.status(401).send('Invalid email or password');
  } else {
    const hash = bcrypt.hashSync(req.body.password, user.salt);
    if (hash === user.hash) {
      const token = jwt.sign(
        { email: user.email, name: user.name, hash: user.hash },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        },
      );
      res
        .status(200)
        .send({
          auth: true,
          userId: user.id,
          token: token,
          email: user.email,
          name: user.name,
        });
    } else {
      res.status(401).send('Invalid email or password');
    }
  }
});

module.exports = router;
