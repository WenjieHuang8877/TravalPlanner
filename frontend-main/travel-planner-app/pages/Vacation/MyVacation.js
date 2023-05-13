import { Layout, Card, Button } from "antd";
const { Content } = Layout;
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyVacation() {
    // create a state of vacations
    const [vacations, setVacations] = useState([]);
    // create a sate of token
    const [token, setToken] = useState();

    // get all vacations from axios api call
    const getVacations = () => {
        if (token == undefined) {
            return;
        }
        axios
            .get(`http://localhost:8080/vacation`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.statusCode === 404) {
                    console.log("No vacations url");
                    return;
                }
                console.log("res.data: ", res.data);
                setVacations(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setToken(localStorage.getItem("authToken"));
        getVacations();
    }, [token]);

    return (
        <Content style={{ padding: "20px 270px", textAlign: "center" }}>
            <h1>Vacation History:</h1>
            {vacations.map((vacation, i) => (
                <div>
                    <Card style={{ margin: "10px 10px" }}>
                        <h2>{vacation.destination}</h2>
                        <h5>{vacation.duration_days} days </h5>
                        <b>From: </b>
                        <span>{vacation.start_date.slice(0, 10)}</span>
                        <b> To: </b>
                        <span>{vacation.end_date.slice(0, 10)} </span>
                        <br />
                        <Button
                            style={{ margin: "20px 0px 0px 0px" }}
                            danger
                            onClick={localStorage.setItem(
                                "vacationId",
                                vacation.id
                            )}
                        >
                            See Plans
                        </Button>
                    </Card>
                </div>
            ))}
        </Content>
    );
}
