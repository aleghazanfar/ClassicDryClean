import { Button, Layout, Space, Typography } from "antd";
import logo from "../assets/CalssLogo.jpg";
import { MenuOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title, Text } = Typography;

function AppHeader({ onMenuClick }) {
  return (
    <Header className="header-app">
      <div className="header-left">
        <Button
          className="mobile-menu-button"
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        />
        <img src={logo} />
      </div>

      <div className="headerright">
        <Button
          type="text"
          icon={<BellOutlined style={{ color: "white" }} />}
          aria-label="Notification"
        />
        <Button
          type="text"
          icon={<UserOutlined style={{ color: "white" }} />}
          aria-label="User profile"
        />
      </div>
    </Header>
    // <Header className="app-header">
    //   <div className="header-left">
    //     <Button
    //       className="mobile-menu-button"
    //       type="text"
    //       icon={<MenuOutlined />}
    //       onClick={onMenuClick}
    //       aria-label="Open navigation menu"
    //     />

    //     <div>
    //       <Title level={4} className="header-title">
    //         Class Dry Clean
    //       </Title>

    //       <Text className="header-subtitle">Order & Invoice Management</Text>
    //     </div>
    //   </div>

    //   <Space size="middle" className="headerSpace">
    //     <Button
    //       type="text"
    //       icon={<BellOutlined />}
    //       aria-label="Notifications"
    //     />

    //     <Button type="text" icon={<UserOutlined />} aria-label="User profile" />
    //   </Space>
    // </Header>
  );
}

export default AppHeader;
