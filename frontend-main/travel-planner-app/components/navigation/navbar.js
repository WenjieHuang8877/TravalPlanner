import {
  HomeOutlined,
  SmileOutlined,
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useJwt } from "react-jwt";



const NavBar = (props) => {
  const items =  [
  {
    label: <Link href="/">TRIP PLANNER</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },

  {
    label: <Link href="/Vacation">Start a New Vacaton</Link>,
    key: "new-vacation",
    icon: <AppstoreOutlined />,
    disabled: false,
  },
  {
    label: <Link href="/Vacation/MyVacation">My Vacation</Link>,
    key: "my-vacation",
  },

  {
    label: "User",
    key: "UserSubMenu",
    icon: <UserOutlined />,
    children: [
      {
        type: "group",
        label: "account info",
        children: [
          {
            label: <Link href={`/User`}>User Detail</Link>,
            key: "user-info",
          },
          {
            label: <Link href={`/User/update`}>User Update</Link>,
            key: "user-update",
          },
        ],
      },
    ],
  },

  {
    label: <Link href="/Test">Test Page</Link>,
    key: "test",
  },

  {
    label: "Quick testing links",
    key: "TestSubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "register / login",
        children: [
          {
            label: <Link href="/Login">User Login</Link>,
            key: "login-test",
          },
          {
            label: <Link href="/Signup">Sign up</Link>,
            key: "signup-test",
          },
        ],
      },
      {
        type: "group",
        label: "other links",
        children: [
          {
            label: <Link href="/Vacation/Plans">Vacation Plans</Link>,
            key: "link:1",
          },
          {
            label: "Link 2",
            key: "link:2",
          },
          {
            label: "Link 3",
            key: "link:3",
          },
        ],
      },
    ],
  },
];
  // const [current, setCurrent] = useState("mail");
  // let userInfoRef = useRef({
  //   userId: "",
  //   authToken: "",
  // });

  // useEffect(() => {}, []);
 
  // if (typeof window !== "undefined") {
  //   userInfoRef.current.authToken = localStorage.getItem("authToken");
  //   const { decodedToken, isExpired } = useJwt(userInfoRef.current.authToken);
  //   userInfoRef.current.userId = decodedToken?.id;
  // }

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />);
};
export default NavBar;
