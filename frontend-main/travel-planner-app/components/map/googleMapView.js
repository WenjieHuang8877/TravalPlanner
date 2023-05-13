import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { data } from "./../../constants.js";
const GPT_API_KEY = data[1].gpt_key;
const GOOGLE_API_KEY = data[0].google_key;

// https://www.npmjs.com/package/@react-google-maps/api
// https://react-google-maps-api-docs.netlify.app/

const containerStyle = {
    width: "800px",
    height: "400px",
    borderRadius: "10px",
};

// const center = {
//   lat: 40.748,
//   lng: -73.985
// };

class GoogleMapView extends Component {
    render() {
        const { lat, lng } = this.props;

        const center = {
            lat: lat,
            lng: lng,
        };
        return (
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                </GoogleMap>
            </LoadScript>
        );
    }
}

export default GoogleMapView;
