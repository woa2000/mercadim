import React, { useState } from "react";
import { UserOutlined, LogoutOutlined, FormOutlined, KeyOutlined } from '@ant-design/icons';
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

  function handleChangePassword() {
    console.log('handleChangePassword')
    dispatch(logout(userId))
    .then(() => {
      window.location.href = '/change-password';
    });
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
                    <div className="label" onClick={handleChangePassword} ><KeyOutlined /> Alterar Senha</div>                    
                  </div>
                  <div>
                    <div className="label text-danger mt-5" onClick={handleSignOut} ><LogoutOutlined /> Sair</div>
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