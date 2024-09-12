import React, { useState, useEffect } from 'react';
import { Menu } from '@arco-design/web-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SubMenuCompontent } from '../SubMenu';
import store from '@/store';
import { localRouters } from '@/routers';
import useLocale from '@/utils/useLocale';

const MenuItem = Menu.Item;

export default function MenuCompontent() {
  const t = useLocale();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [routerList, setRouterList] = useState([]);
  const [selectRouter, setSelectRouter] = useState(['/dashboard/room-one']);
  const [opneKeys, setOpenKeys] = useState(['/dashboard']);

  useEffect(() => {
    // const { routers } = store.getState().routerReducer;
    setRouterList(localRouters);
  }, []);

  useEffect(() => {
    setSelectRouter([pathname]);
  }, [pathname]);

  const handlerToRouter = (key) => {
    navigate(key);
  };

  return (
    <Menu
      style={{ width: '100%', height: '100%' }}
      mode="vertical"
      selectedKeys={selectRouter}
      openKeys={opneKeys}
      onClickMenuItem={handlerToRouter}
      onClickSubMenu={(_, openKeys) => {
        setOpenKeys(openKeys);
      }}
    >
      {routerList.map((item) => {
        const { meta, children } = item;
        const { name, title, icon } = meta || {};
        if (children) {
          return SubMenuCompontent(item, t);
        }
        return (
          <MenuItem key={item.key}>
            {icon || ''}
            {t[name] || title}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
