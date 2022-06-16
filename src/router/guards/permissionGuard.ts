import type { RouteLocationRaw, Router } from 'vue-router';

import { REFRESH_TOKEN_KEY, RouteName } from '@/constants';
import { useProfileStore } from '@/store';

import type { Nillable } from '#/types';

const checkPaths = (name: Nillable<string>): boolean => {
  if (!name) return false;

  return [RouteName.HOME, RouteName.SIGN_IN].includes(name as RouteName);
};

export const createPermissionGuard = (router: Router): void => {
  const profile = useProfileStore();

  router.beforeEach(async ({ name, fullPath, query, redirectedFrom }, from) => {
    if (query.logout === null) {
      profile.logout();
      if (name) return { name };
    }

    const isSignIn = name === RouteName.SIGN_IN;

    const signInParams: RouteLocationRaw = { name: RouteName.SIGN_IN };
    if (!isSignIn && name !== RouteName.HOME) {
      signInParams.query = { redirect: fullPath };
    }

    if (profile.isUserExist) {
      if (isSignIn) {
        return { name: RouteName.HOME };
      }

      return true;
    }

    if (checkPaths(String(name))) return true;

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken && !from.name && !isSignIn) {
      return true;
    }

    return signInParams;
  });
};
