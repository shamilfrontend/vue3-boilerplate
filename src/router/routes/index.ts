import type {
  RouteRecordRaw,
  RouteComponent
} from 'vue-router';

import { RouteName } from '@/constants';

import { testPageRoutes } from './test-page';

const SignIn = (): Promise<RouteComponent> =>
  import(/* webpackChunkName: "public-pages" */ '@/pages/SignIn');
const SomethingWrong = (): Promise<RouteComponent> =>
  import(/* webpackChunkName: "public-pages" */ '@/pages/SomethingWrong');

export const routes: RouteRecordRaw[] = [
  testPageRoutes,

  {
    name: RouteName.SIGN_IN,
    path: '/signin',
    component: SignIn,
    meta: { layout: 'empty' }
  },

  {
    name: RouteName.SOMETHING_WRONG,
    path: '/:pathMatch(.*)*',
    props: true,
    component: SomethingWrong
  }
];
