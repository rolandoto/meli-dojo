import {Home, NotFound} from '../pages';

export const routes = [
    {
      path: "/",
      component: Home,
      exact: true,
    },
    {
      path: "*",
      component: NotFound,
    },
  ];