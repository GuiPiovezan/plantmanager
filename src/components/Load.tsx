import React from  'react';
import {
    StyleSheet,
    View,
} from  'react-native';

import LottieView from 'lottie-react-native';

import loadingAnimation from '../assets/load.json';

export function Load(){
    return(
        <View style={styles.container}>
            <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={styles.loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    },
});