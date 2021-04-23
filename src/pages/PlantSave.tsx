import React, { useState } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Button } from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import DataTimePiker, {Event} from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';
import { PlantProps, SavePlant } from '../libs/storage';

import { useNavigation, useRoute } from '@react-navigation/core';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave(){

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios' ? true : false);
    const navigation = useNavigation();
    const route = useRoute();
    const { plant } = route.params as Params;

    function onChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro ⏰');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(true);
    }

    async function handleSave(){

        try{    
            await SavePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            }); 

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            })
        } catch {
            Alert.alert('Não foi possível salvar. 😢');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri 
                    uri={plant.photo}
                    width={150}
                    height={150}
                />
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantDescription}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image 
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>
               {showDatePicker && (
                    <DataTimePiker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={onChangeTime}
                        style={{height: 120}}
                    />
               )}

               {
                  Platform.OS === "android" &&(
                      <TouchableOpacity 
                        onPress={handleOpenDateTimePickerForAndroid}
                        style={styles.dataTimePikerButton}
                      >
                        <Text style={styles.dataTimePikerText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                      </TouchableOpacity>
                  ) 
                }
                <Button 
                    title="Cadastrar planta"
                    onPress={handleSave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
        justifyContent: 'space-between',
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantDescription: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative', 
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginTop: -40,
    },
    dataTimePikerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dataTimePikerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    }
})