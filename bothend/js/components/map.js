// import { connect } from 'react-redux'
// import { graphql, compose, withApollo } from 'react-apollo'
// import ApolloClient from 'apollo-client'
// import gql from 'graphql-tag'
// import update from 'react-addons-update'
// import { Button } from 'reactstrap'
//
// import log from '../../log'
// import AMOUNT_QUERY from '../graphql/count_get.graphql'
// import ADD_COUNT_MUTATION from '../graphql/count_add_mutation.graphql'


import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import MyGreatPlaceWithHover from "./map_icon";

class SimpleMap extends Component {
    static defaultProps = {
        center: {lat: -37.812733, lng: 144.968233},
        zoom: 14,
        places: []
    };

    _onChange = (e) => {
        this.props.onCenterChange(e.center.lat, e.center.lng);
    }


    render() {

        let markers = this.props.places.map((place) => {
            return <MyGreatPlaceWithHover {...place} />
        })
        return (
            <div style={{width: '100%', height: '100vh'}}>

                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyCb1hnpVBSqrhDy1Ga9A4hZX0d1AGjjkIY",
                        language: 'en',
                    }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onChange={this._onChange}
                >
                    {markers}
                </GoogleMapReact>
            </div>
        );
    }
}
export default SimpleMap;
