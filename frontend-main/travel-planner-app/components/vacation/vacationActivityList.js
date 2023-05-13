import { Steps, Row, Col, Card, Typography } from "antd";
import { React, useState } from "react";
import ActivityCard from "./ActivityCard";
const { Title } = Typography;

const { Step } = Steps;

const VacationActivityList = (props) => {
    // create a state
    const [current, setCurrent] = useState(0);

    const onChange = (current) => {
        console.log("onChange:", current);
        setCurrent(current);
    };

    const listItems = props.activities.map((activity, i) => {
        // if i is odd show <item>
        if (i % 2 != 1)
        return (
            <item
                // title={`Wish ${i + 1}` }
                title={
                    <Title level={4}>
                        {`Attraction ${i/2 + 1} : ${activity.activity_name}`}{" "}
                    </Title>
                }
                description={
                <>
                <ActivityCard detail={activity}/>
                <ActivityCard detail={props.activities[i+1]}/>
                </>
            }
            ></item>
        ) ;
    });

    return (
        <div
            style={{
                margin: "0px 0px 0",
                padding: "10px 20px",
                background: "white",
                textAlign: "center",
            }}
        >
            {" "}
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <Steps
                        current={current}
                        onChange={onChange}
                        direction="vertical"
                    >
                        {listItems}
                    </Steps>
                </Col>
                <Col span={3}></Col>
            </Row>
        </div>
    );
};

export default VacationActivityList;
