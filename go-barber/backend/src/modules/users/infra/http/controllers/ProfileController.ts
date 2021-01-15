import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfile from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const userWithPassword = await showProfile.execute({ user_id });

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

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfile);

    const userWithPassword = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
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
