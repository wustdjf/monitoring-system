import React from 'react';
import logo from '@/assets/logo/logo.svg';
import useLocale from '@/utils/useLocale';
import './style.less';

export default function LogoCompontent() {
  const t = useLocale();

  return (
    <div className="logo-wrap">
      <img alt="logo" src={logo} width="30px" height="100%" />
      <h1 className="logo-title">{t.title}</h1>
    </div>
  );
}
