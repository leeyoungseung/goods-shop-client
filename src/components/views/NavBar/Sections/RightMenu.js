/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu , Icon, Badge} from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../../../../_actions/auth_actions';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();


  const logoutHandler = () => {

    console.log("RightMenu param check start")
    console.log(JSON.stringify(auth.authToken))
    console.log("RightMenu param check end")


    dispatch(signOut(JSON.stringify(auth.authToken)))
    .then(response => {
      if (response.status === 200) {
        props.history.push("/");
        alert('Log Out Success')
      } else {
        alert('Log Out Failed')
      }
    });
  };

  // console.log("RightMenu param check start")
  // console.log(auth)
  // console.log(JSON.stringify(auth))
  // console.log(auth.userData)
  // console.log(auth.authToken)
  // console.log("RightMenu param check end")
  if (!auth.userData && !auth.authToken) {
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
        <Menu.Item key="add">
          <a href="/product/add" >upload</a>
        </Menu.Item>
        <SubMenu title={<span>For Manage</span>}>
          <MenuItemGroup title={<span><a href="/">Item Manage</a></span>}>
            <Menu.Item key="product:add"><Link key="/product/add" to="/product/add">Add Item</Link></Menu.Item>

          </MenuItemGroup>
        </SubMenu>
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

