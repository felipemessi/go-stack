import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user: userWithPassword, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = {
      id: userWithPassword.id,
      name: userWithPassword.name,
      email: userWithPassword.email,
      avatar: userWithPassword.avatar,
      created_at: userWithPassword.created_at,
      updated_at: userWithPassword.updated_at,
    };

    return response.json({ user, token });
  }
}
