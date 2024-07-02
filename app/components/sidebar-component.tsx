"use client"

import { DashOutlined, ProductOutlined, ShoppingCartOutlined, SmallDashOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import SidebarMenuItemComponent from "./sidebar-menu-item-component";

interface SidebarProps {
  isOpenedSidebar: boolean;
}

export default function SidebarComponent(props: SidebarProps) {
  return (
    <div className={ props.isOpenedSidebar ? 'sidebar' : 'sidebar close' }>
      <div className="logo-details">
        <img src="/images/next-logo.png"
        className="logo-image" />
        <span className="logo_name">DASHBOARD</span>
      </div>
      <ul className="nav-links">
        <SidebarMenuItemComponent icon={ <ProductOutlined /> } name='Dashboard' redirectRoute="main">
        </SidebarMenuItemComponent>
        <SidebarMenuItemComponent icon={ <DashOutlined /> } name='Category' redirectRoute="category">
        </SidebarMenuItemComponent>
        <SidebarMenuItemComponent icon={ <ShoppingCartOutlined />} name="Product" redirectRoute="product" />
      </ul>
    </div>
  );
}