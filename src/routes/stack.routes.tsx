import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { SelectPlant } from '../pages/SelectPlant';

import colors from '../styles/colors';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >
        <Stack.Screen 
            name="Welcome"
            component={Welcome}
        />
        <Stack.Screen 
            name="UserIdentification"
            component={UserIdentification}
        />
        <Stack.Screen 
            name="Confirmation"
            component={Confirmation}
        />
        
        <Stack.Screen 
            name="SelectPlant"
            component={AuthRoutes}
        />

        <Stack.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <Stack.Screen 
            name="MyPlants"
            component={AuthRoutes}
        />

    </Stack.Navigator>
)

export default AppRoutes;