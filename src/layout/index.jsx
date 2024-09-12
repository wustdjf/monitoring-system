// layout/index.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './style.less';
import { Layout } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
// redux
import { useDispatch } from 'react-redux';
// store
import { setMenuHandler } from '@/store/actions/menu';
import {
  LogoCompontent,
  MenuCompontent,
  NavBarItemCompontent,
  AvatarComponent
} from './compontents';
import { setting } from '@/config/setting';

const { Sider } = Layout;
const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;

const { copyright } = setting;

function PublicLayout() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);

    dispatch(setMenuHandler(!collapsed));
  };

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
        <Sider
          style={{ width: `${collapsed ? '48px' : '200px'}` }}
          collapsed={collapsed}
          collapsible
          onCollapse={handleCollapsed}
          trigger={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
          breakpoint="xl"
        >
          <MenuCompontent />
        </Sider>
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
