import { Card, Layout} from "antd";
import UserLoginForm from "../components/user/UserLoginForm";
import { useRouter } from "next/router";
const {Content} = Layout;

export default function UserLoginPage() {
  const router = useRouter();
  return (
    <Content style={{ padding: "20px 140px", textAlign: "center", width: "100%",}}>
      <Card
        title="Welcome Back!"
        bordered={true}
        style={{
          width: 600,
        
        }}
      >
        <UserLoginForm />
      </Card>
    </Content>
  );
}
