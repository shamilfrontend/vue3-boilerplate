import { router } from '@/router';

import { createPermissionGuard } from './permissionGuard';

export const setupRouterGuard = (): void => {
  createPermissionGuard(router);
};
