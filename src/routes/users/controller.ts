import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import { addUser, login } from './service';

export async function addUserController(req: Request, res: Response) {
  try {
    const result = await addUser(
      req.body.name,
      req.body.email,
      req.body.password,
    );
    res.status(201).send(result);
  } catch (error: any) {
    logger('addUser', 'error', error);
    res.status(500).send(error.message);
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await login(req.body.email, req.body.password);
    res.status(201).send(result);
  } catch (error: any) {
    logger('login', 'error', error);
    res.status(401).send(error.message);
  }
}
