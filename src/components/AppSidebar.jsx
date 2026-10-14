import { Menu } from "antd";

import {
  DashboardOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/createOrder",
    icon: <FileAddOutlined />,
    label: "New Order",
  },
  {
    key: "/orders",
    icon: <UnorderedListOutlined />,
    label: "All Orders",
  },
  {
    key: "/customers",
    icon: <TeamOutlined />,
    label: "Customers",
  },
  {
    key: "/invoices",
    icon: <FileTextOutlined />,
    label: "Invoices",
  },
  {
    key: "/reports",
    icon: <BarChartOutlined />,
    label: "Reports",
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

function AppSidebar({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey =
    location.pathname === "/" ? "/orders/new" : location.pathname;

  const handleMenuClick = ({ key }) => {
    navigate(key);

    // Close the mobile drawer after navigation.
    onNavigate?.();
  };

  return (
    <Menu
      mode="inline"
      theme="dark"
      items={menuItems}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      className="app-sidebar-menu"
    />
  );
}

export default AppSidebar;
