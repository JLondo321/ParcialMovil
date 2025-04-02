import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet } from 'react-native';

import Main from "./src/screens/Main";
import Second from "./src/screens/Second";


const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <ImageBackground 
      source={require('./assets/Fondo.png')} 
      style={styles.backgroundImage}
    >
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f44336',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: { backgroundColor: 'transparent' }
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={Main} 
            options={{ title: 'Pokédex' }}
          />
          <Stack.Screen 
            name="PokemonDetails" 
            component={Second} 
            options={({ route }) => ({ 
              title: route.params.pokemon.name.charAt(0).toUpperCase() + route.params.pokemon.name.slice(1),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});