import {
  BellFilled,
  HomeFilled,
  MessageFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  getItem(<Link to="/">Home</Link>, "/", <HomeFilled />),
  getItem(
    <Link to="/messenger">Messenger</Link>,
    "/messenger",
    <MessageFilled />
  ),
  getItem(
    <Link to="/notification">Notifications</Link>,
    "/notification",
    <BellFilled />
  ),
  getItem(<Link to="/settings">Settings</Link>, "/settings", <SettingFilled />),
];

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  console.log(location);

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-800"
      >
        <div className="h-16 bg-gray-900 flex items-center justify-center text-white">
          Logo
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className="text-gray-300"
        />
      </Sider>
      <Layout>
        <Header className="bg-gray-100 p-0 h-16 flex items-center" />
        <Content className="m-4">{children}</Content>
        <Footer className="text-center bg-gray-50 py-4">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
