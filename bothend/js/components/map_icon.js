import React, {PropTypes, Component} from "react";
import {greatPlaceStyle, greatPlaceStyleHover} from "./map_icon_styles";

export default class MyGreatPlaceWithHover extends Component {
    static propTypes = {
        // GoogleMap pass $hover props to hovered components
        // to detect hover it uses internal mechanism, explained in x_distance_hover example
        $hover: PropTypes.bool,
        marker: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    };

    static defaultProps = {};


    constructor(props) {
        super(props);
    }

    render() {
        const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;

        switch (this.props.eventType) {
            case "global":
                var icon = require("../../assets/subicons/S-Globe.png");
                break;
            case "educational":
                var icon = require("../../assets/subicons/S-Hat.png");
                break;
            case "group":
                var icon = require("../../assets/subicons/S-Money.png");
                break;
            case "Hist":
                var icon = require("../../assets/subicons/S-Romance.png");
                break;
            default:
                var icon = require("../../assets/Logos.png");
                break;
        }

        var width = 300;
        var padding = 15;

        return this.props.$hover ? (
            <div style={style}>
                {this.props.marker}
                <div style={{
                    width: width + 'px',
                    background: 'linear-gradient(360deg, #ffffff 60%, #e9b559 40%)',
                    color: '#000',
                    textAlign: 'center',
                    borderRadius: '6px',
                    padding: padding + 'px 0',
                    position: 'absolute',
                    left: -width / 2 + 'px',
                    zIndex: 1
                }}>
                    <h1>{this.props.title}</h1>
                    <br/><br/>
                    <p>{this.props.description}</p>
                </div>
            </div>
        ) : (
            <img
                style={{
                    width: 64 + 'px',
                    top: 'calc(50% - 6px)',
                    left: 'calc(50% - 16px)',
                    right: 100+'px'
                }}
                src={icon}
            />
        );
    }
}
