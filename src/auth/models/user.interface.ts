import { Role } from './role.enum';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
}
