import { Tabs } from "antd";
import VacationActivityList from "./vacationActivityList";

const onChange = (key) => {
    console.log(key);
};

const VacationDayList = (props) => (
    <div
    style={{
        margin: "-16px 0px 0",
        padding: "10px 50px",
        background: "white",
        textAlign: "center",
                        
    }}
>
    <Tabs 
    defaultActiveKey="1" 
    onChange={onChange} 
    animated={true}
    centered={true}  
    items={props.days.map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Day ${id}`,
          key: id,
          children: <VacationActivityList activities={props.days[i].activities}/>,
        };
      })}  
    />
    
    </div>
);
export default VacationDayList;
