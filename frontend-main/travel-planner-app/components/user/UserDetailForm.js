import { useEffect, useState } from "react";
import { Descriptions, Button, message } from "antd";
import React from "react";
import { useRouter } from "next/router";
import { searchUser } from "../../utils";

const UserDetailForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const { userId } = props;
  const router = useRouter();

  const routeChange = () => {
    //let path = `/User/3021872870/update`;
      let path = `/User/update`
    router.push(path);
  };

  useEffect(() => {
    if (userId) {
      handleSearchUser();
    }
  }, [userId]);

  const handleSearchUser = async () => {
    setLoading(true);
    try {
      const resp = await searchUser(userId);
      setUser(resp || []);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Descriptions column={2} title="User Info">
        <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
      </Descriptions>
      <Button color="primary" className="px-4" onClick={routeChange}>
        Update your personal infomation
      </Button>
    </div>
  );
};
export default UserDetailForm;
