// layout/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.less';
import { Layout } from '@arco-design/web-react';
import { LogoCompontent, NavBarItemCompontent, AvatarComponent } from './compontents';

import { setting } from '@/config/setting';

const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;

const { copyright } = setting;

function PublicLayout() {
  return (
    <Layout className="layout-container">
      <Header className="layout-header">
        <LogoCompontent />
        <div className="layout-header-right">
          <NavBarItemCompontent />
          <AvatarComponent />
        </div>
      </Header>
      <Layout className="layout-main-wrap">
        <Content className="layout-content">
          <div className="layout-main-content">
            <Outlet />
          </div>
          <Footer className="layout-footer">{copyright}</Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default React.memo(PublicLayout);
