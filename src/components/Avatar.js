import React from 'react';
import { Image } from "react-native";

export default props => {
    return (
        <Image style={{
                width: 200,
                height: 200,
            }}
               source={{ uri: props.uri}}
               resizeMode={'contain'}
        />
    )
}
