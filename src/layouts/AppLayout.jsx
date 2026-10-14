import { useState } from "react";

import { Button, Drawer, Grid, Layout, Typography } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import AppSidebar from "../components/AppSidebar";
import AppHeader from "../components/AppHeader";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

function AppLayout({ children }) {
  const screens = useBreakpoint();

  // Below Ant Design's md breakpoint, use the mobile drawer.
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Layout className="app-layout">
      <AppHeader onMenuClick={() => setDrawerOpen(true)} />

      <Layout className="app-body">
        {!isMobile && (
          <Sider
            width={240}
            collapsedWidth={80}
            collapsed={collapsed}
            trigger={null}
            className="desktop-sidebar"
          >
            <div className="sidebar-brand">
              <Text strong>{collapsed ? "CDC" : "Class Dry Clean"}</Text>
            </div>

            <AppSidebar />
          </Sider>
        )}

        <Layout className="content-layout">
          {!isMobile && (
            <div className="collapse-toolbar">
              <Button
                type="text"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed((value) => !value)}
              />
            </div>
          )}

          <Content className="app-content">{children}</Content>
        </Layout>
      </Layout>

      <Drawer
        title="Class Dry Clean"
        placement="left"
        size={280}
        open={isMobile && drawerOpen}
        onClose={closeDrawer}
        styles={{
          body: {
            padding: 0,
            background: "#001529",
          },
        }}
      >
        <AppSidebar onNavigate={closeDrawer} />
      </Drawer>
    </Layout>
  );
}

export default AppLayout;
