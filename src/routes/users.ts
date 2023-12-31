import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/db';

const router = express.Router();
const createSession = (user: any) => {
  const token = jwt.sign(
    { email: user.email, name: user.name, hash: user.hash },
    process.env.JWT_SECRET!,
    {
      expiresIn: 86400,
    },
  );
  return {
    auth: true,
    userId: user.id,
    token,
    email: user.email,
    name: user.name,
  };
};

router.route('/').post(async (req: Request, res: Response) => {
  try {
    req.body.salt = bcrypt.genSaltSync(10);
    req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
    delete req.body.password;
    const user = await db.users.add(req.body);
    const session = createSession(user);
    res.status(201).send(session);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.route('/login').post(async (req: Request, res: Response) => {
  const user = await db.users.getByEmail(req.body.email);
  if (!user) {
    res.status(401).send('Invalid email or password');
  } else {
    const hash = bcrypt.hashSync(req.body.password, user.salt);
    if (hash === user.hash) {
      const session = createSession(user);
      res.status(201).send(session);
    } else {
      res.status(401).send('Invalid email or password');
    }
  }
});

export default router;
