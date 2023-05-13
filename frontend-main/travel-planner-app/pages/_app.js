import "../styles/globals.css";
import "antd/dist/reset.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavBar from "../components/navigation/navbar";
const { Header, Content, Footer } = Layout;

// <Component {...pageProps} />
function MyApp({ Component, pageProps }) {
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo"></div>
        <NavBar />
      </Header>
      <Content style={{ padding: "0 0px" }}>
        <Component {...pageProps} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        GPT TripPlanner ©2023 Created by 1024 Group
      </Footer>
    </Layout>
  );
}

export default MyApp;
