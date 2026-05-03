import { Location } from '@prisma/client';

export type PublicLocation = Pick<Location, 'id' | 'name' | 'city' | 'address'>;
