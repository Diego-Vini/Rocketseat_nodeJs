import { Request, Response } from 'express'
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    email: 'diego@email.com',
    password: '123456',
    techs: [
        'node', 
        'react', 
        'react native',
        {title: 'javascript', experience: 100}
    ]
  });

 
  return res.json({ Message: 'Hello World'});
};