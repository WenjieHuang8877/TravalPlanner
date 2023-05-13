import React from "react";
import { GlobalOutlined, HeartOutlined } from "@ant-design/icons";
//import axios from "axios";
import { searchSites, vacationIdInit } from "../../utils";
import {
    Button,
    Card,
    Form,
    Image,
    Input,
    List,
    Layout,
    // Text,
    message,
    Tooltip,
    DatePicker,
} from "antd";

const {Content} = Layout;

// import {BASE_URL} from "../constants";
const { RangePicker } = DatePicker;
import { useState, useEffect } from "react";

function NewVacationFrom(props) {
    const [loading, setLoading] = useState(false);
    const { onSearch } = props;


    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        setToken(localStorage.getItem("authToken"));
    }, []);

    const handleSearch = async (query) => {

        setLoading(true);
        try {
            const resp = await searchSites(query);
            console.log("resp--", resp);
            // 如果 siteList 大于 0 个
            if (resp && resp.length > 0) {
                const id = userId;
                console.log("user id in init------------", id);
                const { id: vacationId } = await vacationIdInit(id, {
                    ...query,
                });
                // 如果有vacationId 保存到localStorage
                if (vacationId) {
                    localStorage.setItem("vacationId", vacationId);
                }
            }
            console.log(4, resp);
            // setData(resp || []);
            onSearch(resp);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      <Content style={{ padding: "20px 30px", textAlign: "center", width: "100%",}}>

            <Form
                name="vacation_init"
                className="vacation-form"
                onFinish={handleSearch}
            >
                <Form.Item
                    name="destination"
                    rules={[
                        {
                            required: true,
                            message: "Please input the place of your trip!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <GlobalOutlined className="site-form-item-icon" />
                        }
                        placeholder="City"
                    />
                </Form.Item>
                <Form.Item
                    name="interest"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please input your the kind of place you want to visit! such as museum",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <HeartOutlined className="site-form-item-icon" />
                        }
                        placeholder="Interest"
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please input the date of your trip!",
                        },
                    ]}
                >
                    <RangePicker />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Explore Your Trip!
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
}

export default NewVacationFrom;
