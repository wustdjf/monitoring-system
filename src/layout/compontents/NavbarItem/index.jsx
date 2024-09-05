import React, { useState, useEffect, useContext } from 'react';

import { Space, Menu, Input, Button, Dropdown, Tooltip, Message } from '@arco-design/web-react';

import {
  IconFullscreen,
  IconFullscreenExit,
  IconLanguage,
  IconMoonFill,
  IconSun,
  IconNotification,
  IconRefresh,
  IconSearch
} from '@arco-design/web-react/icon';
import './navbarItem.less';
import screenfull from 'screenfull';
import { generate } from '@arco-design/color';
import { GlobalContext } from '@/context';

export default function NavBarItemCompontent() {
  const [isScreenfull, setScreenfull] = useState(false);
  const [isRefresh, setRefresh] = useState(true);
  const [theme, setTheme] = useState('light');
  const { setLang, lang } = useContext(GlobalContext);

  const list = generate('#00D084', { list: true });
  console.log(list);
  const handleChangeScreen = () => {
    if (!screenfull.isEnabled) {
      Message.warning('进入全屏失败');
      return false;
    }
    setScreenfull(!isScreenfull);
    screenfull.toggle();
  };

  useEffect(() => {
    setRefresh(true);
  }, [isRefresh]);

  const handlerChangeRefresh = () => {
    setRefresh(false);
  };

  const handleChangetheme = () => {
    const themeType = theme === 'light' ? 'dark' : 'light';
    setTheme(themeType);
    if (themeType === 'dark') document.body.setAttribute('arco-theme', 'dark');
    else document.body.removeAttribute('arco-theme');
  };

  const handlerChangeLang = (val) => {
    setLang(val);
  };

  return (
    <div className="layout-header-edit">
      <Space size="medium">
        <Input style={{ width: 200 }} prefix={<IconSearch />} placeholder="请输入内容查询" />
        <Tooltip
          position="bottom"
          trigger="hover"
          content={`点击${isScreenfull ? '退出' : '切换'}全屏模式`}
        >
          <Button
            shape="circle"
            icon={isScreenfull ? <IconFullscreenExit /> : <IconFullscreen />}
            onClick={handleChangeScreen}
          />
        </Tooltip>
        <Dropdown
          position="br"
          droplist={
            <Menu defaultSelectedKeys={[lang]} onClickMenuItem={handlerChangeLang}>
              <Menu.Item key="zh-CN">简体中文</Menu.Item>
              <Menu.Item key="en-US">English</Menu.Item>
            </Menu>
          }
        >
          <Button shape="circle" icon={<IconLanguage />} />
        </Dropdown>
        <Button shape="circle" icon={<IconNotification />} />
        <Tooltip
          position="bottom"
          trigger="hover"
          content={`点击切换为${theme === 'light' ? '暗黑' : '亮色'}模式`}
        >
          <Button
            shape="circle"
            icon={theme === 'light' ? <IconMoonFill /> : <IconSun />}
            onClick={handleChangetheme}
          />
        </Tooltip>
        <Tooltip position="bottom" trigger="hover" content="刷新">
          <Button shape="circle" icon={<IconRefresh />} onClick={handlerChangeRefresh} />
        </Tooltip>
      </Space>
    </div>
  );
}
