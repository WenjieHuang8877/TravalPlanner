//import styles from "../../styles/Home.module.css";
//import { useRouter } from "next/router";
import { Card, Layout } from "antd";
import { useRouter } from "next/router";
import UserUpdateForm from "../../components/user/UserUpdateForm";

const { Content } = Layout;

import { useEffect, useState } from "react";


// http://localhost:3000/User/{user_id}

export default function UserUpdatePage() {
  const [userId, setUserId] = useState(undefined);
  useEffect(() => {
      setUserId(localStorage.getItem("userId"));
    }, [])
  

  
  return (
    <Content
            style={{
                padding: "20px 340px",
                textAlign: "center",
                width: "100%",
            }}
        >
      <Card
        title="Your User imformation"
        bordered={false}
      >
        <UserUpdateForm userId={userId} />
      </Card>
    </Content>
  );
}
