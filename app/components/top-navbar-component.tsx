"use client"

import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useState } from "react";

interface TopNavbarProps {
  isOpenedSidebar: boolean;
  onClickSidebarIcon: () => void;
  user: UserSystem;
}

export default function TopNavbarComponent(props: TopNavbarProps) {
  const [showUserDropdown, setUserDropdown] = useState(false);

  return(
    <div className="top-navbar">
      <div className="bx-menu">
        {
          props.isOpenedSidebar ? <DoubleLeftOutlined style={
            { color: '#0c0c0c', fontSize: '22px' }
          } onClick={ props.onClickSidebarIcon } /> : <DoubleRightOutlined style={
            { color: '#0c0c0c', fontSize: '22px' }
          } onClick={ props.onClickSidebarIcon } />
        }
      </div>
      <div className="header-user" onClick={
        () => setUserDropdown(!showUserDropdown)
      }>
        <Avatar src="/images/user.png" size={ 48 }></Avatar>
        <div className="name-text hidden md:block" style={
          {
            marginRight: "2vw"
          }
        }>
          { props.user.full_name }
        </div>
      </div>
      {
        showUserDropdown ? 
        <div className="dropdown-user">
          <Avatar className="mb-3" src="/images/user.png" size={ 96 }></Avatar>
          <div className="name-dropdown-text mb-2">
            Biondi Bagasta Wiko Putra
          </div>
          <div className="job-text mb-5">
            Fullstack Developer
          </div>
          <div className="dropdown-user-button">
            <Button type="primary" size="large">Edit Profile</Button>
            <Button type="primary" danger size="large">Logout</Button>
          </div>
        </div> :
        <></>
      }
    </div>
  )
}