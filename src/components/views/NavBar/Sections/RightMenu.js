/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu , Icon, Badge} from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const auth = useSelector(state => state.auth)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/signin");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (auth.userData && !auth.authToken) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/signin">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/signup">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history" >History</a>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/product/upload" >upload</a>
        </Menu.Item>

        {/* <Menu.Item key="cart" style={{ paddingBottom: 3}}>
          <Badge count={auth.userData && auth.userData.cart.length}>
          <a href="/user/cart" className="head-example" style={{ marginRight: -22, color:'#667777'}}>
            <Icon type="shopping-cart" style={{ fontSize:30, marginBottom: 3}}></Icon>
          </a>
          </Badge>
        </Menu.Item> */}

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

