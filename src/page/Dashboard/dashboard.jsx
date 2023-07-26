import React, { useState, useEffect } from 'react';
import axiosInstance from '../../request/index.jsx';
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import EditPainting from '../EditPainting/EditPainting.jsx';

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
  getItem('Arts', '2', <DesktopOutlined />),
  getItem('Paintings', '3', <UserOutlined />),
  getItem('Videos', '4', <TeamOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paintingsCount, setPaintingsCount] = useState(0);
  const [videosCount, setVideosCount] = useState(0);

  // Introduce a new state variable to keep track of the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const fetchUserInfo = () => {
    axiosInstance.get(`/users/4`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch user information:', error);
      });
  }

  const fetchPaintingsCount = () => {
    axiosInstance.get(`/users/4/paintings/count`)
      .then(response => {
        setPaintingsCount(response.data.count);
      })
      .catch(error => {
        console.error('Failed to fetch paintings count:', error);
      });
  }

  const fetchVideosCount = () => {
    axiosInstance.get(`/users/4/videos/count`)
      .then(response => {
        setVideosCount(response.data.count);
      })
      .catch(error => {
        console.error('Failed to fetch videos count:', error);
      });
  }

  useEffect(() => {
    fetchUserInfo();
    fetchPaintingsCount();
    fetchVideosCount();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onMenuItemClick = (e) => {
    setSelectedMenuItem(e.key);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={onMenuItemClick} />
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
              'Loading...'
            ) : (
              selectedMenuItem === '1' ? (
                <div>
                  <h2>User ID:{user && user.id}</h2>
                  <p>User Email:{user && user.email}</p>
                </div>
              ) : selectedMenuItem === '2' ? (
                <div>
                  <h2>Paintings: {paintingsCount}</h2>
                  <h2>Videos: {videosCount}</h2>
                </div>
              ) : selectedMenuItem === '3' ? (
                    <EditPainting/>
              ): null
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