import React from "react";
//import axios from "axios";
import { useState } from "react";
import { addSites } from "../../utils";
import { Button,Popover, Card, Col, Image, Row, Tooltip, Rate, List, Collapse, Divider } from "antd";
import SiteCard from "../site/siteCard.js";
// import {BASE_URL} from "../constants";

const { Panel } = Collapse;

function SitesList(props) {
    const [loading, setLoading] = useState(false);

    const { data } = props;
    console.log("data in siteslist", data);

    const onChange = (key) => {
        console.log(key);
    };
    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    return (
        <>
            {data.map((item, i) => (
                <li className="travelcompany-input" key={i}>
                    <Card>
                        <Row>
                            <Col span={12}>
                                <Image
                                    src={item.image_url}
                                    style={{ borderRadius: "10px"}}
                                />
                            </Col>
                            <Col
                                span={10}
                                offset={1}
                                style={{ textAlign: "left" }}
                            >
                                <h3 style={{ textAlign: "left" }}>
                                    {item.site_name}
                                </h3>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={item.rating}
                                />
                                <Divider/>
                                <Popover   overlayStyle={{
    width: "50vw"
  }} content={ <div style={{width: "100%"}}><p>{item.description}</p></div>} title="Description" trigger="hover">
                                <p>{item.description.slice(0, 150)+"..."}</p>
                                </Popover>
                                <Button
                                    shape="round"
                                    type="primary"
                                    onClick={() => addSites(item)}
                                >
                                    Add to Your Plan
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                </li>
            ))}

            
        </>
    );
}

export default SitesList;
