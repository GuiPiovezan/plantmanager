import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { Header } from '../components/Header';
import {EnviromentButton} from '../components/EnviromentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import api from '../services/api';
import { useNavigation } from '@react-navigation/core';

interface EnviromentProps {
    key: string;
    title: string;
}


export function SelectPlant(){
    const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}_limit=4`);

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants( oldValues => [...oldValues, ...data])
            setFilteredPlants( oldValues => [...oldValues, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment);

        if(enviroment == "all")
            return setFilteredPlants(plants);

        const filtered = plants.filter( plants => 
            plants.environments.includes(enviroment)    
        );
        setFilteredPlants(filtered);

        fetchPlants();
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        else {
            setLoadingMore(true);
            setPage(oldValue => oldValue + 1);
            fetchPlants();
        }
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroment([
                {
                key: 'all',
                title: 'Todos',
                },
                ...data
        ]);
        }

        fetchEviroment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if(loading)
        return <Load />
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList 
                    data={enviroment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={
                        ({item}) => (
                            <EnviromentButton 
                                title={item.title}
                                active={item.key === enviromentSelected}
                                onPress={ () => handleEnviromentSelected(item.key)}
                            />
                        )
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={
                        ({item}) => (
                            <PlantCardPrimary 
                                data={item}
                                onPress={() => handlePlantSelect(item)}
                            />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={
                        ({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore ?
                        <ActivityIndicator color={colors.green} /> : <></>
                    }
                />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
        color: colors.heading,
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        marginBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1, 
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
    },
})