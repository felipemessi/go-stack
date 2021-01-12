import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptsHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
