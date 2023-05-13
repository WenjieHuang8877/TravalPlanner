import axios from "axios";
import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import MenuCard from "../components/MenuCard";
import NavigationBar from "../components/NavigationBar";
import ReviewList from "../components/ReviewList";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { withRouter } from "react-router";


function RestaurantPage() {
    const [restaurant, setRestaurant] = useState([]);
    const cur_id = useParams().id;
    


    // axios.get(`https://qq27l.mocklab.io/api/students/df0000`)
    // .then(res => {
    //   const rsp_student = res.data;
    //   this.setStudent({ rsp_student });
    //   console.log(rsp_student)
    // })
    const getRestaurantData = () => {
        // https://srgqazz14j.execute-api.us-east-2.amazonaws.com/test1/restaurant/${props.restaurant_id}
        // http://18.218.230.112:5011/api/restaurants/${props.restaurant_id}
        axios
            .get(
                `https://srgqazz14j.execute-api.us-east-2.amazonaws.com/test1/restaurant/${cur_id}`
            )
            .then((res) => {
                const rsp_restaurant = res.data;
                setRestaurant(rsp_restaurant);
            });
        // console.log(restaurant);
    };

    useEffect(() => {
        getRestaurantData();
    }, []);

    return (
        <div className="center">
            <NavigationBar/>
            <div className="cards_containter center">
                <h1>{restaurant.name}</h1>

                <div ><ReviewList restaurant_id = {cur_id}/></div>
              <MenuCard  className="cards_containter center" restaurant_id = {cur_id}/>
            </div>
            
        </div>
    );
}

export default RestaurantPage;
