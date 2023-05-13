import {
    Card,
    Button,
    Popover,
    Rate,
    Divider,
    Space,
    Badge,
    Collapse,
} from "antd";
const { Meta } = Card;
import Link from "next/link";
import GoogleMapView from "../map/googleMapView";
import { useState } from "react";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

import GoogleMapDirection from "../map/googleMapDirection";




const ActivityCard = (props) => {
    if (props.detail === undefined) {
        return(<></>)
    }
    const type = props.detail.activity_type;

    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const onChange = (key) => {
        console.log(key);
    };

    if (type == "Site") {
        return (
            <div>
                <Card
                    style={{}}
                    cover={
                        <img alt="example" src={props.detail.activity_image} />
                    }
                >
                    <Meta title={props.detail.activity_address} />
                    <Divider />
                    <Space>
                        <Button type="primary" ghost>
                            <Link
                                href={
                                    "https://" + props.detail.activity_website
                                }
                            >
                                Website
                            </Link>
                        </Button>
                        <Button type="primary" ghost>
                            Add to Calandar
                        </Button>
                        <Popover
                            forceRender={true}
                            content={
                                <>
                                    <GoogleMapView lat = {props.detail.activity_latitude} lng = {props.detail.activity_longitude}/>
                                    <a onClick={hide}>close</a>
                                </>
                            }
                            title="Drag the avatat to the map to see the street view"
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                        >
                            <Button type="primary">See Street View</Button>
                        </Popover>
                    </Space>
                </Card>
            </div>
        );
    }
    return (
        <Card style={{ backgroundColor: "#f5f5f5" }}>
            <Meta title={props.detail.activity_address} />
            
            <p>
                <b>Transit Details To the Next Location </b>
                <Badge
                    count={`${Math.round(props.detail.activity_duration * 60)} mins`}
                    showZero
                    color="#faad14"
                />
            </p>
            <Collapse defaultActiveKey={[]} onChange={onChange}>
                <Panel header="Get Transit Details" key="1" forceRender={true}>
                    <GoogleMapDirection
                        origin= {props.detail.activity_start_address}
                        destination= {props.detail.activity_end_address}
                    />
                </Panel>
            </Collapse>
        </Card>
    );
};

export default ActivityCard;
