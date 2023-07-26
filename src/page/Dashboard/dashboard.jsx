import React, { useState, useEffect } from 'react';
import axiosInstance from '../../request/index.jsx';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Information', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];


const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUserInfo = () => {
    // Replace 'userId' with the actual ID of the current user
    axiosInstance.get(`/users/4`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch user information:', error);
      });
  }
  // Fetch user information on component mount
  useEffect(() => {
    fetchUserInfo();
  }, []);
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {loading ? (
            'Loading user information...'
            ) : (
            <div>
                <h2>{user && user.id}</h2>
                <p>{user && user.email}</p>
            </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Your Footer Here
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

