

import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '3600s'
};


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
