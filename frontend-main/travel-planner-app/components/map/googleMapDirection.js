import React, { Component } from "react";
import {
    DirectionsService,
    LoadScript,
    ScriptLoaded,
    GoogleMap,
    DirectionsRenderer,
} from "@react-google-maps/api";

import { data } from "./../../constants.js";
const GPT_API_KEY = data[1].gpt_key;
const GOOGLE_API_KEY = data[0].google_key;

class GoogleMapDirection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: null,
            travelMode: "TRANSIT",
        };

        this.directionsCallback = this.directionsCallback.bind(this);
        this.checkDriving = this.checkDriving.bind(this);
        this.checkBicycling = this.checkBicycling.bind(this);
        this.checkTransit = this.checkTransit.bind(this);
        this.checkWalking = this.checkWalking.bind(this);
        this.getOrigin = this.getOrigin.bind(this);
        this.getDestination = this.getDestination.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

    directionsCallback(response) {
        console.log(response);

        if (response !== null) {
            if (response.status === "OK") {
                this.setState(() => ({
                    response,
                }));
            } else {
                console.log("response: ", response);
            }
        }
    }

    checkDriving({ target: { checked } }) {
        checked &&
            this.setState(() => ({
                travelMode: "DRIVING",
            }));
    }

    checkBicycling({ target: { checked } }) {
        checked &&
            this.setState(() => ({
                travelMode: "BICYCLING",
            }));
    }

    checkTransit({ target: { checked } }) {
        checked &&
            this.setState(() => ({
                travelMode: "TRANSIT",
            }));
    }

    checkWalking({ target: { checked } }) {
        checked &&
            this.setState(() => ({
                travelMode: "WALKING",
            }));
    }

    getOrigin(ref) {
        this.origin = ref;
    }

    getDestination(ref) {
        this.destination = ref;
    }

    onClick() {
        if (this.origin.value !== "" && this.destination.value !== "") {
            this.setState(() => ({
                origin: this.origin.value,
                destination: this.destination.value,
            }));
        }
    }

    onMapClick(...args) {
        console.log("onClick args: ", args);
    }

    render() {
        return (
            <div className="map">

                <div className="map-container">
                    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
                        <GoogleMap
                            // required
                            id="direction-example"
                            // required
                            mapContainerStyle={{
                                height: "400px",
                                width: "100%",
                            }}
                            // required
                            zoom={2}
                            // required
                            center={{
                                lat: 0,
                                lng: -180,
                            }}
                            // optional
                            onClick={this.onMapClick}
                            // optional
                            onLoad={(map) => {
                                console.log(
                                    "DirectionsRenderer onLoad map: ",
                                    map
                                );
                            }}
                            // optional
                            onUnmount={(map) => {
                                console.log(
                                    "DirectionsRenderer onUnmount map: ",
                                    map
                                );
                            }}
                        >
                            <DirectionsService
                                // required
                                options={{
                                    // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                    destination: this.props.destination,
                                    origin: this.props.origin,
                                    travelMode: this.state.travelMode,
                                }}
                                // required
                                callback={this.directionsCallback}
                                // optional
                                onLoad={(directionsService) => {
                                    console.log(
                                        "DirectionsService onLoad directionsService: ",
                                        directionsService
                                    );
                                }}
                                // optional
                                onUnmount={(directionsService) => {
                                    console.log(
                                        "DirectionsService onUnmount directionsService: ",
                                        directionsService
                                    );
                                }}
                            />

                            {this.state.response !== null && (
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                        directions: this.state.response,
                                    }}
                                    // optional
                                    onLoad={(directionsRenderer) => {
                                        console.log(
                                            "DirectionsRenderer onLoad directionsRenderer: ",
                                            directionsRenderer
                                        );
                                    }}
                                    // optional
                                    onUnmount={(directionsRenderer) => {
                                        console.log(
                                            "DirectionsRenderer onUnmount directionsRenderer: ",
                                            directionsRenderer
                                        );
                                    }}
                                />
                            )}
                        </GoogleMap>
                        
                    </LoadScript>
                </div>
            </div>
        );
    }
}

export default GoogleMapDirection;
