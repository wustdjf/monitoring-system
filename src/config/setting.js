export const setting = {
  // 是否开启登录拦截, mock数据的时候可以启用
  loginInterception: true,
  // 默认展开路由
  defaultOpeneds: ['/comp', '/errorPage', '/chart'],
  // token名称
  tokenName: 'token',
  // 存储token的localStorage名称
  tokenTableName: 'TOKEN_TABLE_NAME',
  // 标题
  title: '温湿度监控系统',
  // 版权信息
  copyright: 'Copyright © 2023-2024 Amphastar All Rights Reserved, Developed By ChangStar Company',
  // 路由白名单不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401']
};
