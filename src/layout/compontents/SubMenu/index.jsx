import { Menu } from '@arco-design/web-react';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export function SubMenuCompontent(item, t) {
  const { key, meta, children } = item;
  const { name, title, icon } = meta || {};
  return (
    <SubMenu
      key={key}
      title={
        <span className="sub-menu-icon">
          {icon || ''}
          {t[name] || title}
        </span>
      }
    >
      {children.map((option) => {
        const optionIcon = option?.meta?.icon;
        const optionName = option?.meta?.name;
        const optionTitle = option?.meta?.title;
        if (option.children) {
          return SubMenuCompontent(option, t);
        }
        return (
          <MenuItem key={option.key}>
            {optionIcon || ''}
            {t[optionName] || optionTitle}
          </MenuItem>
        );
      })}
    </SubMenu>
  );
}
