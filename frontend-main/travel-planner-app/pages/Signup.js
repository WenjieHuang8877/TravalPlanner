
import { Card, Layout} from "antd";
import UserSignupForm from "../components/user/UserSignupForm";
const {Content} = Layout;



export default function UserSignupPage() {
  return (
    <Content style={{ padding: "20px 140px", textAlign: "center", width: "100%",}}>
      <Card
        title="Your Best Trip Planner"
        bordered={false}
        
      >
        <UserSignupForm />
       
      </Card>
    </Content>
  );
}
