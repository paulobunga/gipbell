import React from 'react';
import ForeignProfile from '../containers/ForeignProfile';

class ForeignProfileScreen extends React.Component {

    render() {
        return (
            <ForeignProfile user_id={this.props.navigation.getParam('user_id')}/>
        );
    }
}

export default ForeignProfileScreen;
