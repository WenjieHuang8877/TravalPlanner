import { useState } from "react";
import { message, Input, Button, Select, Form } from "antd";
import { register} from "../../utils";
//import { useRouter} from "next/router";
// import { UserOutlined, KeyOutlined } from "@ant-design/icons";
// import style from "antd/es/alert/style";
import axios from "axios";
import { type } from "os";
import { useRouter } from 'next/navigation';



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 8,
    },
  },
};

const { Option } = Select;
const UserSignupForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  // const navigateToLoginPage = () => {
  //   navigate(`/LoginPage`);
  // };

  // const handleUpdateUser = async (userid, data) => {
  //   setLoading(true);
  //   try {
  //     await updateUser(userid, data);
  //     message.success("Update successfully");
  //   } catch (error) {
  //     message.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  //   //const { username, password } = values;

  //   // const { email, userName, password, imageUrl } = values;
  //   const { email, username, password } = values;
  //   const opt = {
  //     // method: "POST",
  //     //url: `${BASE_URL}/signup`,//use url in wechat
  //     // url: `https://srgqazz14j.execute-api.us-east-2.amazonaws.com/v1/user`,
  //     // data: {
  //       email: email,
  //       userName: username,
  //       password: password,
  //       // imageUrl: imageUrl,
  //       //username: username,
  //       //password: password //改成和schma一样的
  //     // },
  //     // headers: { "content-type": "application/json" },
  //   };
    const handleFormSubmit = async (data) => {
      setLoading(true);
      const { email, username, password } = data;
      const opt = {
        email: email,
        userName: username,
        password: password,
      };
      try {
        await register(opt);
        message.success("Sign up successfully");
        router.push('/Login');
        
      } catch (error) {
        message.error(error.message)
      } finally {
        setLoading(false);
      }

    // axios(opt)
    //   .then((response) => {
    //     console.log(response);
    //     // case1: registered success
    //     if (response.data === "Success") {
    //       message.success("Registration succeed!");
    //       props.history.push("/LoginPage");
    //     } else {
    //       console.log("register failed: ");
    //       message.success("Registration failed!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("register failed: ", error.message);
    //   });
    // navigateToLoginPage();
    // register(opt);
  };

  //password wsername age gender
  return (
    <div className="Auth-form-signup">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <hr /> */}
      <h3 className="Auth-form-title">Sign Up</h3>
      <div className="form-group container_1">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleFormSubmit}
          className="register"
        >
          <Form.Item
            name="email"
            label="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input disabled={loading} placeholder="Please enter your email" />
          </Form.Item>

          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input your user name",
              },
            ]}
          >
            <Input
              disabled={loading}
              placeholder="Please enter your user name"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              disabled={loading}
              placeholder="Please enter your password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              disabled={loading}
              placeholder="Please enter your password"
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="register-btn center"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}


export default UserSignupForm;
