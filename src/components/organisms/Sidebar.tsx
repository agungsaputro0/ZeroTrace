import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  WalletOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { MdLocalShipping, MdAddBusiness } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { userAuth } = useAuth();
  const navigate = useNavigate(); 

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleRedirect = (path: string) => {
    navigate(path); 
  };

  return (
    <Sider
      className={`sidebar ${expanded ? 'sidebar-expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ background: 'transparent',  width: expanded ? '200px' : '80px!important' }}
    >
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
      {userAuth?.includes(1) && (
        <Menu.Item 
          key="1" 
          icon={<HomeOutlined />} 
          className="sidebar-menu-item"
          onClick={() => handleRedirect('/Home')} 
        >
          <span className="sidebar-menu-text">Dashboard</span>
        </Menu.Item>
        )}
        {!userAuth?.includes(1) && (
        <Menu.Item 
          key="1" 
          icon={<HomeOutlined />} 
          className="sidebar-menu-item"
          onClick={() => handleRedirect('/Portal')} 
        >
          <span className="sidebar-menu-text">Dashboard</span>
        </Menu.Item>
        )}
        <Menu.Item 
          key="2" 
          icon={<MdAddBusiness />} 
          className="sidebar-menu-item"
          onClick={() => handleRedirect('/BankSampah')} 
        >
          <span className="sidebar-menu-text">Bank Sampah</span>
        </Menu.Item>
        <Menu.Item 
          key="3" 
          icon={<WalletOutlined />} 
          className="sidebar-menu-item"
          onClick={() => handleRedirect('/buku-tabungan')} 
        >
        <span className="sidebar-menu-text">Buku Tabungan</span>
        </Menu.Item>
        {userAuth?.includes(1) && (
          <Menu.Item 
            key="4" 
            icon={<MdLocalShipping />} 
            className="sidebar-menu-item"
            onClick={() => handleRedirect('/pick-up-sampah')} 
          >
            <span className="sidebar-menu-text">Pick Up Sampah</span>
          </Menu.Item>
        )}
        {userAuth?.includes(1) && (
          <Menu.Item 
            key="5" 
            icon={<ShopOutlined />} 
            className="sidebar-menu-item"
            onClick={() => handleRedirect('/marketplace')} 
          >
            <span className="sidebar-menu-text">Marketplace</span>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
