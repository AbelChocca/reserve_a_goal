export type SafeUser = {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN_LOCAL' | 'SUPER_ADMIN';
  createdAt: Date;
};
