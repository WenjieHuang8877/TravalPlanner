import React from "react";
import {
    Spin,
    Layout,
    Carousel,
    Typography,
    Avatar,
    Button,
    Space,
    Card,
    Divider,
    Input,
} from "antd";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { data } from "./../constants.js";
const GPT_API_KEY = data[1].gpt_key;
const GOOGLE_API_KEY = data[0].google_key;


const { Title, Paragraph, Text } = Typography;

// https://mixkit.co/free-stock-video/
const { Search } = Input;

const { Content } = Layout;
const { Meta } = Card;



const LandingPage = () => {
    const [loading, setLoading] = useState(false);
    const toggle = (checked) => {
        setLoading(checked);
    };
    const onSearch = (value) => {
        const query = "Please write a travel guide for " + value;
        toggle(true);

        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: {
                model: "text-davinci-003",
                prompt: query,
                max_tokens: 1000,
                temperature: 0,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    `Bearer ${GPT_API_KEY}`,
            },
        })
            .then((res) => {
                console.log(res.data.choices[0].text);
                toggle(false);
                setData(res.data.choices[0].text);
            })
            .catch((e) => {
                console.log(e.message, e);
            });
    };

    const str = "";
    const [data, setData] = useState(
        `New York is a city famous for its pizza, offering a wide variety of styles to choose from. Here is a quick guide to help you find the best pizzas in the city:

        1. Lombardi's Pizza: Located in Little Italy, Lombardi's is considered the first pizzeria in America and is a must-visit for pizza lovers. Try their classic Margherita pizza.
        
        2. Di Fara Pizza: Found in Midwood, Brooklyn, Di Fara Pizza is known for its hand-made pies and long lines. It's worth the wait for a slice of their famous square pizza.
        
        3. Prince Street Pizza: Known for their crispy, cheesy slices, Prince Street Pizza is located in NoLIta and is a popular spot for late-night snacking. Try their spicy pepperoni slice.
        
        4. Patsy's Pizzeria: This Harlem institution has been serving coal-fired pizzas for over 80 years. Their thin-crust pizzas are a must-try, especially the classic Margherita.
        
        5. Totonno's Pizzeria Napolitana: Located in Coney Island, Totonno's is known for its Neapolitan-style pizzas. Try their famous Margherita pie, made with San Marzano tomatoes and fresh mozzarella.
        
        Remember, pizza is a personal preference, so be sure to try different places and find your own favorite. Enjoy your pizza tour in New York!`
    );

    const contentStyle = {
        margin: 0,
        height: "190px",
        color: "#000",
        lineHeight: "160px",
        textAlign: "center",
    };

    const cardStyle = {
        width: "300px",
        marginTop: 16,
        height: "500px",
    };

    return (
        <Layout>
            <Content>
                <Carousel autoplay>
                    <div>
                        <video
                            className="videoTag full-width "
                            autoPlay
                            loop
                            muted
                        >
                            <source
                                src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-during-the-night-4308-large.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div>
                        <video
                            className="videoTag full-width "
                            autoPlay
                            loop
                            muted
                        >
                            <source
                                src="https://assets.mixkit.co/videos/preview/mixkit-paris-from-the-air-near-the-eiffel-tower-27212-large.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div>
                        <video
                            className="videoTag full-width "
                            autoPlay
                            loop
                            muted
                        >
                            <source
                                src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-temple-between-gardens-29807-large.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </Carousel>

                <Content style={{ padding: "20px 70px", textAlign: "center" }}>
                    <Title>Plan a new Journey with a click</Title>
                    <Space
                        direction="vertical"
                        style={{
                            width: "40%",
                        }}
                    >
                        <Button type="primary" block size="large">
                            <Link href="/Vacation">Start a new vacation</Link>
                        </Button>
                    </Space>
                </Content>

                <Content style={{ padding: "20px 70px", textAlign: "center" }}>
                    <Space
                        direction="vertical"
                        style={{
                            width: "70%",
                        }}
                    >
                        <Card
                            style={{
                                cardStyle,
                            }}
                        >
                            <Search
                                addonBefore="Please write a travel guide for "
                                placeholder="New York about pizza"
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            />
                            <Divider />
                            <Meta
                                style={{ textAlign: "left" }}
                                avatar={
                                    <Avatar
                                        size="large"
                                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1425a7d1-05a8-4dd7-8e23-a55405e8c165/d32090n-633f05b6-2438-45da-89ff-3bd5634ce3cc.png/v1/fill/w_800,h_800,strp/doraemon_vector_by_abc_123_def_456_d32090n-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvMTQyNWE3ZDEtMDVhOC00ZGQ3LThlMjMtYTU1NDA1ZThjMTY1XC9kMzIwOTBuLTYzM2YwNWI2LTI0MzgtNDVkYS04OWZmLTNiZDU2MzRjZTNjYy5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VYANfB4Z9OVcjCLqRmUQ_HTgDKS8GQ208giFxw-pLMs"
                                    />
                                }
                                title="Travel Guide"
                                description={
                                    <Spin spinning={loading} size="large">
                                        <Paragraph>
                                            <ul>
                                                {data.split("\n").map((str, i) => (
                                                    <div key={"dev-" +i}>
                                                        {str === "" ? (
                                                            ""
                                                        ) : (
                                                            <blockquote className="line" key={"line-" +i}>
                                                                {str}
                                                            </blockquote>
                                                        )}
                                                    </div>
                                                ))}
                                            </ul>
                                        </Paragraph>
                                    </Spin>
                                }
                            />
                        </Card>
                    </Space>
                </Content>
            </Content>
        </Layout>
    );
};

export default LandingPage;
