import bcrypt from 'bcryptjs';
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
 * @param name: string
 * @param email: string
 * @param password: string
 * @param return object: { auth: boolean, userId: string, token: string, email: string, name: string, accountId: string }
 */
export async function addUser(name: string, email: string, password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // TODO: separate the account creation from the user creation
  // allow the initial user to specify the account name
  // create new route to handle initial user creating new users under the account
  // give user priveleges to create new users under the account (admin, user, etc.)
  const account = await db.accounts.add(email);
  const account_id = account.id;
  const user = await db.users.add({ name, email, hash, salt, account_id });
  const session = createSession(user);
  return session;
}

/**
 * Login a user
 * @param email: string
 * @param password: string
 * @param return object: { auth: boolean, userId: string, token: string, email: string, name: string, accountId: string }
 */
export async function login(email: string, password: string) {
  const user = await db.users.getByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  } else {
    const hash = bcrypt.hashSync(password, user.salt);
    if (hash === user.hash) {
      const session = createSession(user);
      return session;
    } else {
      throw new Error('Invalid email or password');
    }
  }
}
