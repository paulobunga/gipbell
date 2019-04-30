import React from 'react';
import { View, Spinner } from 'native-base';

export default class Loader extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spinner />
            </View>
        );
    }
}
