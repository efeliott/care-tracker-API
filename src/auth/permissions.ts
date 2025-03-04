export const ROLE_PERMISSIONS = {
    admin: ['users:read', 'users:update', 'users:delete', 'protected:access','tasks:create', 'tasks:read', 'tasks:update', 'tasks:delete'],
    agent: ['protected:access','tasks:create', 'tasks:read', 'tasks:update', 'tasks:delete'],
    usager: ['users:profile','tasks:read'],
  };  