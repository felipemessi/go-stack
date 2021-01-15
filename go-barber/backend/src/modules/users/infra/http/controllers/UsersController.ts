import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const userWithPassword = await createUser.execute({
      name,
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

    return response.json(user);
  }
}
