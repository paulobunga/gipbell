import { width } from './layout';
import {  Platform, PixelRatio } from 'react-native';

export const normalize = (size) => {
    const scale = width / 320;
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
};
