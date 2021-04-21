import React, { useState } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableNativeFeedback,
    Platform,
    Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { Button } from '../components/Button'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    function handleContinue(){
        navigation.navigate('Confirmation');
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableNativeFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😆' : '😃'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>
                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && 
                                    {borderColor: colors.green}
                                ]} 
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Confirmar" 
                                    onPress={ handleContinue }
                                /> 
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content:{
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20,
    },
    footer: {
        margin: 40,
        width: '100%',
        paddingHorizontal: 20,
    },
})