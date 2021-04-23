import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text, 
    Image
} from 'react-native';
import { Header } from '../components/Header';
import { formatDistance } from 'date-fns';
import { LoadPlant, PlantProps } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import { pt } from 'date-fns/locale';
import { FlatList } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

export function MyPlants(){

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorageData(){
            const plantStoraged = await LoadPlant();

            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt } 
            );

            setNextWatered(
                `Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime}.`
            )

            setMyPlants(plantStoraged);
            setLoading(false);
        }

        loadStorageData();
    }, [])

    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spolightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecundary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spolightImage: {
        width: 60,
        height: 60,

    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }      
})