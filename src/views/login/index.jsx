import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Grid, Typography } from '@arco-design/web-react';
import { IconUser, IconSafe, IconWechat, IconFile, IconCode } from '@arco-design/web-react/icon';
// 路由
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// store
import { loginHandler } from '@/store/actions/user';
import useLocale from '@/utils/useLocale';
import { getCodeImg } from '@/api/user';

import './login.less';
import store from '@/store';

export default function Login() {
  const dispatch = useDispatch();

  const t = useLocale();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [codeUrl, setCodeUrl] = useState('');
  const [uuid, setUuid] = useState('');
  const getCode = () => {
    getCodeImg().then((res) => {
      const url = 'data:image/gif;base64,' + res.img;
      setUuid(res.uuid);
      setCodeUrl(url);
    });
  };
  useEffect(() => {
    getCode();
  }, []);

  const handleSubmit = async (formItem) => {
    await dispatch(loginHandler({ ...formItem, uuid }));
    const { accessToken } = store.getState().userReducer;
    if (accessToken) {
      navigate('/dashboard');
    }
  };
  return (
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-left-content">
          <Typography.Title className="login-text">
            A system to monitor the temperature and humidity
          </Typography.Title>
          <Typography.Title className="login-text" heading={5}>
            {t.title}
          </Typography.Title>
          <Typography.Text className="login-text">点击右侧登录体验</Typography.Text>
          <div className="btn">
            <Space size={16}>
              <Button shape="round" type="primary" icon={<IconFile />}>
                文档(待完善)
              </Button>
              <Button shape="round" type="primary" icon={<IconWechat />}>
                微信交流群(待建设)
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <div className="login-form">
        <div className="form-warp">
          <Typography.Title>您好！</Typography.Title>
          <Typography.Title heading={5}>欢迎登录温湿度监控系统</Typography.Title>
          <Form form={form} wrapperCol={{ span: 24 }} onSubmit={handleSubmit}>
            <Space direction="vertical" size={10}>
              <Form.Item field="username" rules={[{ required: true, message: '用户名不能为空' }]}>
                <Input prefix={<IconUser />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item field="password" rules={[{ required: true, message: '密码不能为空' }]}>
                <Input.Password prefix={<IconSafe />} placeholder="请输入密码" />
              </Form.Item>

              <Grid.Row gutter={24}>
                <Grid.Col span={12}>
                  <Form.Item field="code" rules={[{ required: true, message: '验证码不能为空' }]}>
                    <Input prefix={<IconCode />} placeholder="请输入验证码" />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Form.Item>
                    <img src={codeUrl} alt="验证码" className="login-code-img" onClick={getCode} />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>

              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" long>
                  登 录
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
}
