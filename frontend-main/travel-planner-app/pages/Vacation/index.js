import NewVacationForm from "../../components/vacation/newVacationForm";
import SitesList from "../../components/vacation/siteslist";
import { Card, Row, Col, Layout, Space, Button, Divider } from "antd";
import { useRouter } from "next/router";

import { useState } from "react";

const { Content } = Layout;

export default function VacationInit() {
    const [data, setData] = useState([]);
    const router = useRouter();

    const getSearchedData = (data) => {
        setData(data);
        Button.disabled = "false";
    };

    const disableBtnProps = {};
    if (data.length > 0) {
        disableBtnProps.disabled = false;
    } else {
        disableBtnProps.disabled = true;
    }

    const routeChange = () => {
        let path = `/Vacation/Plans`;
        //  let path = `/user/${userId}`
        router.push(path);
    };

    return (
        <Content style={{ padding: "20px 70px", textAlign: "center" }}>
            {console.log(data)}
            <Row>
                <Col span={14}>
                    <Card title="Start Your Trip With Us" bordered={false}>
                        <SitesList data={data} />
                    </Card>
                </Col>

                <Col span={1} />

                <Col span={9}>
                    <Card
                        title="Start Your Trip With Us"
                        bordered={false}
                        style={{}}
                    >
                        <NewVacationForm onSearch={getSearchedData} />
                        {/* <Components2 onChange={(innerText) => setText(innerText)}></Components2>
        <Components1 text={text}></Components1> */}
        <Divider />

                        <Button
                            shape="rount"
                            danger
                            onClick={routeChange}
                            {...disableBtnProps}
                        >
                            Generate Schedule
                        </Button>
                    </Card>
                    <br />
                </Col>
            </Row>
        </Content>
    );
}
