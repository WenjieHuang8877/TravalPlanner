import { Tabs, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import VacationDayList from "../../../components/vacation/vacationDayList";
import axios from "axios";

import { useState, useEffect } from "react";

// http://localhost:3000/Vacation/Plans
// 如果页面渲染失败需要重新从主页进去一下

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: "1",
        label: `Plan 1`,
        children: <VacationDayList />,
    },
    {
        key: "2",
        label: `Plan 2`,
        children: <VacationDayList />,
    },
    {
        key: "3",
        label: `Plan 3`,
        children: <VacationDayList />,
    },
];

const MyPlans = () => {
    const [plans_data, setPlans] = useState([]);
    const [configs, seConfigs] = useState([]);
    const [vacation_id, setVacation_id] = useState();
    const [token, setToken] = useState();

    const getVacationPlans = () => {
        if (vacation_id === undefined) {
            return;
        }

        console.log("vacation_id: " + vacation_id);
        axios
            .get(`http://localhost:8080/vacation/${vacation_id}/plan`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            .then((res) => {
                if (res.statusCode === 404) {
                    console.log("No plans");
                    return;
                }
                console.log("res: ", res);

                const rsp_plans = res.data.plans;
                console.log("rsp_plans: ", rsp_plans);
                setPlans(rsp_plans);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("here is the data stored in plans: ", plans_data);
    };

    useEffect(() => {
        // setVacation_id(localStorage.getItem("vacation_id")); // 正常的话这里应该是从localstorage里面获取vacation_id
        // setVacation_id(1); // 用假数据
        setVacation_id(localStorage.vacationId);
        setToken(localStorage.authToken);

        // wait 1 second
        getVacationPlans();
        console.log(plans_data);
    }, [vacation_id]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: "20px 50px 0",
                overflow: "initial",
            }}
        >
            <Tabs
                defaultActiveKey="1"
                type="card"
                onChange={onChange}
                size="large"
                items={plans_data.map((_, i) => {
                    const id = String(i + 1);
                    return {
                        label: `Plan ${id}`,
                        key: id,
                        children: <VacationDayList days={plans_data[i].days} />,
                    };
                })}
            />
        </Content>
    );
};
export default MyPlans;
