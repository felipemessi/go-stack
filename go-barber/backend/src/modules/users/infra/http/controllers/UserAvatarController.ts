import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const userWithPassword = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
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
