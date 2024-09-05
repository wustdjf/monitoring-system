import request from '@/utils/request.js';

export const login = async (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  });

// 获取用户详细信息
export const getUserInfo = () =>
  request({
    url: '/getInfo',
    method: 'get'
  });

export const logout = () =>
  request({
    url: '/logout',
    method: 'post'
  });

export const register = async () =>
  request({
    url: '/register',
    method: 'post'
  });

// 获取验证码
export const getCodeImg = async () =>
  request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
