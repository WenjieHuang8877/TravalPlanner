import { useState } from "react";
import { message, Form, Input, Button, Select, Layout } from "antd";
import { updateUser } from "../../utils";
//import { useRouter} from "next/router";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Content } = Layout;
const UserUpdateForm = (props) => {
    const [loading, setLoading] = useState(false);
    const { userId } = props;
    console.log(userId);

    const handleUpdateUser = async (data) => {
        setLoading(true);
        try {
            await updateUser(userId, data);
            message.success("Update successfully", 1);
        } catch (error) {
            message.error(error.message, 1);
        } finally {
            setLoading(false);
        }
    };

    //password wsername age gender
    return (
        <div>
            <Form onFinish={handleUpdateUser}>
                <Form.Item
                    lable="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username",
                        },
                    ]}
                >
                    <Input
                        disabled={loading}
                        prefix={<UserOutlined />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    lable="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                        },
                    ]}
                >
                    <Input
                        disabled={loading}
                        prefix={<KeyOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    lable="Age"
                    name="age"
                    rules={[
                        { required: true, message: "Please input your age" },
                    ]}
                >
                    <Input
                        disabled={loading}
                        prefix={<UserOutlined />}
                        placeholder="Age"
                    />
                </Form.Item>
                <Form.Item
                    lable="Gender"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Please select your gender",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 370 }}
                        placeholder="Select your gender"
                        //onChange={onChange}
                    >
                        <Option value="0">Female</Option>
                        <Option value="1">Male</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Update!
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserUpdateForm;
