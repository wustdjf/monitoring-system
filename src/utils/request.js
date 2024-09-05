import axios from 'axios';
import { Message } from '@arco-design/web-react';
import { getAccessToken, removeAccessToken } from '@/utils/accessToken';
import { tansParams, localStorageGet, localStorageSet } from '@/utils/index';
import apiConfig from '@/config/net.config';

const { baseURL, invalidCode, requestTimeout, contentType } = apiConfig;
// 是否显示重新登录
export const isRelogin = { show: false };

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getAccessToken() && !isToken) {
      config.headers.Authorization = 'Bearer ' + getAccessToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      };
      const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
      const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
      if (requestSize >= limitSize) {
        console.warn(`[${config.url}]: 请求数据大小超出允许的5M限制，无法进行防重复提交验证。`);
        return config;
      }
      const sessionObj = localStorageGet('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        localStorageSet('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        }
        localStorageSet('sessionObj', requestObj);
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.msg || '系统未知错误，请反馈给管理员';
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === invalidCode || code === 401) {
      removeAccessToken();
      window.location.href = '/monitoring/';
      return Message.error('登录状态已过期，请重新登录');
    }
    if (code === 500) {
      return Message.error(msg);
    }
    if (code === 601) {
      return Message.error(msg);
    }
    if (code !== 200) {
      return Message.error(msg);
    }

    return res.data;
  },
  (error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    return Message.error(message);
  }
);

export default service;
