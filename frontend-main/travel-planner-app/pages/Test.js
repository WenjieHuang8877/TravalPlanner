import styles from "../styles/TestPage.module.css";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavBar from "../components/navigation/navbar";
import SiteCard from "../components/site/siteCard";
import DateSelector from "../components/vacation/dateSelector";
import GoogleMapView from "../components/map/googleMapView";
import GoogleMapDirection from "../components/map/googleMapDirection";

const { Header, Content, Footer } = Layout;

const TestPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Content
                style={{
                    padding: "-0px 70px",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Test</Breadcrumb.Item>
                    <Breadcrumb.Item>Component Test</Breadcrumb.Item>
                </Breadcrumb>
            </Content>

            <div
                className="site-layout-content"
                style={{ background: colorBgContainer }}
            >
                <h3>Site Card</h3>
                <SiteCard />
                <h3>Date Selector</h3>
                <DateSelector />
            </div>

            <div
                className="site-layout-content"
                style={{ background: colorBgContainer }}
            >
                <h3>Google Map Test</h3>
                <GoogleMapView></GoogleMapView>
                <br />
                <h3>Google Direction Test</h3>
                <GoogleMapDirection
                    origin="Columbia University"
                    destination="Empire State Building"
                />
            </div>
        </>
    );
};

export default TestPage;
