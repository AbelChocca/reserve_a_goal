import { UserRole } from '@prisma/client';

export type SafeUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
};
