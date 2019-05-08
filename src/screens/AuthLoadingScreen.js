import React from 'react';
import AuthChecker from '../containers/AuthChecker';

class AuthLoadingScreen extends React.Component {
    render() {
        return (
            <AuthChecker
                onNotAuthorized={() => this.props.navigation.navigate('Auth')}
                onAuthorized={() => this.props.navigation.navigate('App')}
            />
        );
    }
}

export default AuthLoadingScreen;
