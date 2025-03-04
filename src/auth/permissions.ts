export const ROLE_PERMISSIONS = {
  admin: [
    'users:read', 'users:update', 'users:delete', 'users:profile',
    'protected:access',
    'tasks:create', 'tasks:read', 'tasks:update', 'tasks:delete',
    'plannings:read',
    'pointages:create', 'pointages:update'
  ],
  agent: [
    'users:read', 'users:update', 'users:delete', 'users:profile',
    'protected:access',
    'tasks:create', 'tasks:read', 'tasks:update', 'tasks:delete',
    'pointages:create', 'pointages:update'
  ],
  usager: ['users:profile', 'tasks:read'],
};