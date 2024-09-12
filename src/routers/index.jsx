import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { IconDashboard, IconMenu } from '@arco-design/web-react/icon';
import LayoutPage from '@/layout';
import EmptyLayout from '@/layout/emptyLayout';
import LoadingComponent from '@/compontents/Loading';

import RequireAuth from '@/compontents/Auth';

const load = (children) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;

const RoomOne = lazy(() => import('@/views/first-room'));
const RoomTwo = lazy(() => import('@/views/second-room'));

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
    key: '/index',
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
    key: '/dashboard',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.dashboard',
      title: '仪表盘',
      icon: <IconDashboard />
    },
    children: [
      {
        index: true,
        path: '/dashboard/room-one',
        key: '/dashboard/room-one',
        element: load(<RoomOne />),
        meta: {
          name: 'menu.dashboard.room1',
          title: '一号房间',
          icon: <IconMenu />
        }
      },
      {
        path: '/dashboard/room-two',
        key: '/dashboard/room-two',
        element: load(<RoomTwo />),
        meta: {
          name: 'menu.dashboard.room2',
          title: '二号房间',
          icon: <IconMenu />
        }
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
