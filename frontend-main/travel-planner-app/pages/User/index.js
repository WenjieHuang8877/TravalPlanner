import { useRouter } from "next/router";
import { Card, Layout } from "antd";
import UserDetailForm from "../../components/user/UserDetailForm";
import { useEffect, useState } from "react";

const { Content } = Layout;

// http://localhost:3000/User/{user_id}

export default function UserDetailPage() {
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
                style={{
                    width: "100%",
                }}
            >
                <UserDetailForm
                    style={{
                        width: "60%",
                    }}
                    userId={userId?userId:0}
                />
            </Card>
        </Content>
    );
}
