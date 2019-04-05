import { User } from 'src/app/shared/models/user.model';

export interface Login {
  authenticated: boolean;
  accessToken: string;
  user: User;
}
