import React from 'react';

import {
    StyleSheet,
    Text,
} from 'react-native';

import {
    RectButton,
    RectButtonProps
} from 'react-native-gesture-handler';

import {SvgFromUri} from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
    return(
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={70} height={70} />
            <Text style={styles.name}>{data.name}</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 30,
        margin: 10,
    },
    name: {
        color: colors.green_dark,    
        fontFamily: fonts.heading,
        fontSize: 16,
    }
})
