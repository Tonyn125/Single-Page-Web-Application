import Relay from "react-relay";

export default class ChangeKarma extends Relay.Mutation {
  static fragments = {
      viewer: () => Relay.QL`fragment on Viewer {
    id
    users {
      count
    }
  }`
  };
    getMutation() {
        return Relay.QL`mutation{updateUser}`;
    }

    getVariables() {
        return {
            id: this.props.id,
            karma: this.props.karma
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on updateUserPayload {
        changedUser {
          id
          karma
        }
      }
    `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
              changedUser: this.props.id
            }
        }];
    }

    getOptimisticResponse() {
        return {
          changedUser: {
            id: this.props.id,
            karma: this.props.karma
          }
      };
    }
}
