import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../database/db';

/**
 * Create a session
 * @param user object: { id: number, account_id: number, email: string, name: string, hash: string }
 * @returns object: { auth: boolean, userId: string, token: string, email: string, name: string, accountId: string }
 */
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
    accountId: user.account_id,
  };
};

/**
 * Add a new user
 * @param req body: { name: string, email: string, password: string }
 * @param return object: { auth: boolean, userId: string, token: string, email: string, name: string, accountId: string }
 */
export async function addUser(req: Request, res: Response) {
  try {
    req.body.salt = bcrypt.genSaltSync(10);
    req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
    delete req.body.password;
    // TODO: separate the account creation from the user creation
    // allow the initial user to specify the account name
    // create new route to handle initial user creating new users under the account
    // give user priveleges to create new users under the account (admin, user, etc.)
    const account = await db.accounts.add(req.body.email);
    req.body.account_id = account.id;
    const user = await db.users.add(req.body);
    const session = createSession(user);
    res.status(201).send(session);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
}

/**
 * Login a user
 * @param req body: { email: string, password: string }
 * @param return object: { auth: boolean, userId: string, token: string, email: string, name: string, accountId: string }
 */
export async function login(req: Request, res: Response) {
  try {
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
  } catch (err: any) {
    res.status(400).send(err.message);
  }
}
