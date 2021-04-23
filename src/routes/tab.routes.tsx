import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { SelectPlant } from '../pages/SelectPlant';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return( 
        <AppTab.Navigator
            tabBarOptions={
                {
                    activeTintColor: colors.green,
                    inactiveTintColor: colors.heading,
                    labelPosition: 'beside-icon',
                    style: {
                        paddingVertical: 2,
                        height: 40,
                    },
                }
            }
        >
            <AppTab.Screen 
                name="Nova planta" 
                component={SelectPlant}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name="add-circle-outline"
                            size={size}
                            color={color} 
                        />
                    ))
                }}
            />

            <AppTab.Screen 
                name="Minhas plantas" 
                component={MyPlants}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color} 
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
} 

export default AuthRoutes