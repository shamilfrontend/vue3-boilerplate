import type { RouteRecordRaw, RouteComponent } from 'vue-router';

import { RouteName } from '@/constants';

const TestPage = (): Promise<RouteComponent> =>
  import(/* webpackChunkName: "profile-page" */ '@/pages/TestPage');

export const testPageRoutes: RouteRecordRaw = {
  path: '/',
  component: TestPage,
  name: RouteName.TEST_PAGE,
  meta: {
    breadcrumb: 'Тестовая страница'
  }
};
