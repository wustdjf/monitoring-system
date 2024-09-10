import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/layout';
import EmptyLayout from '@/layout/emptyLayout';
import LoadingComponent from '@/compontents/Loading';

import RequireAuth from '@/compontents/Auth';

const load = (children) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;

const Dashboard = lazy(() => import('@/views/dashboard'));
const Room = lazy(() => import('@/views/room'));

const Login = lazy(() => import('@/views/login'));

const Error404 = lazy(() => import('@/views/error/404'));

const requirePublicLayout = () => (
  <RequireAuth>
    <LayoutPage />
  </RequireAuth>
);

const requireEmptyLayout = () => (
  <RequireAuth>
    <EmptyLayout />
  </RequireAuth>
);

const routeList = [
  {
    path: '/',
    key: 'index',
    element: requireEmptyLayout(),
    children: [
      {
        index: true,
        key: 'login',
        element: load(<Login />)
      }
    ]
  },
  {
    path: '/dashboard',
    key: 'dashboard',
    element: requirePublicLayout(),
    children: [
      {
        index: true,
        key: 'dashboard',
        element: load(<Dashboard />)
      },
      {
        path: 'room',
        key: 'room',
        element: load(<Room />)
      }
    ]
  },
  {
    path: '*',
    key: 'error',
    element: load(<Error404 />)
  }
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export const localRouters = routeList;
export default RenderRouter;
