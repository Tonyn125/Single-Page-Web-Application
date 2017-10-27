import Relay from "react-relay";

export default class AddEventMutation extends Relay.Mutation {
    static fragments = {
        viewer: () => Relay.QL`fragment on Viewer {
      id
      events {
        count
      }
    }`
    };

    getMutation() {
        return Relay.QL`mutation{addEvent}`;
    }

    getVariables() {
        return {
            lat: this.props.lat,
            lng: this.props.lng,
            title: this.props.title,
            description: this.props.description,
            eventType: this.props.eventType
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on addEventPayload {
        changedEventEdge
        viewer {
          events {
            count
          }
        }
      }
    `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentID: this.props.viewer.id,
            connectionName: 'events',
            edgeName: 'changedEventEdge',
            rangeBehaviors: {
                '': 'prepend'
            }
        }];
    }

    getOptimisticResponse() {
        return {
            changedEventEdge: {
                node: {
                    lat: this.props.lat,
                    lng: this.props.lng,
                    title: this.props.title,
                    description: this.props.description,
                    eventType: this.props.eventType
                }
            },
            viewer: {
                id: this.props.viewer.id,
                events: {
                    count: this.props.viewer.events.count + 1
                }
            }
        };
    }
}
