import React from "react";
import Relay from "react-relay";
import HomePage from "./HomePage";
import AppRoute from "../routes/AppRoute";

export default class App extends React.Component {
    render() {
        return (
            <Relay.RootContainer
                Component={HomePage}
                route={new AppRoute}/>
        );
    }
}
