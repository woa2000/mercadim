import React, { useState } from "react";
import { UserOutlined, LogoutOutlined, FormOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import './styles.css';

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logout } from "../../store/userSlice";


function LoggedUser({ singOut }: any) {
  const { userId, name, email } = useSelector((state: RootState) => state.user);
  const [menuopen, setMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  function handleSignOut() {
    console.log('handleSignOut')
    dispatch(logout(userId));
  }

  function handleMenu() {
    setMenuOpen(!menuopen);
  }

  return (
    <>
      <div className="group-info">
        <div className="info">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="user-name" onClick={handleMenu}>
            {name}
            {
              menuopen && (
                <div className="submenu">
                  {/* <div>
                    <div className="label"><FormOutlined /> Backoffice</div>
                  </div> */}
                  <div>
                    <div className="label" onClick={handleSignOut} ><LogoutOutlined /> Sair</div>
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>


  )
}

export default LoggedUser