import {
  BellFilled,
  HomeFilled,
  MessageFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

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
  getItem("Assignment ", "sub1", null, [
    getItem(<Link to="/assignment">Assignment </Link>, "/assignment"),
  ]),
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
          <SignedOut>
            <SignInButton className="border-[1px] border-slate-200 rounded-full p-2" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
        <Content className="m-4">{children}</Content>
        <Footer className="text-center bg-gray-50 py-4">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
