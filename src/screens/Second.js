import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function PokemonDetails({ route}) {
 
  const { pokemon } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: pokemon.sprites.front_default }} 
          style={styles.image} 
        />
        <Image 
          source={{ uri: pokemon.sprites.back_default }} 
          style={styles.image} 
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Información básica</Text>
        <Text style={styles.info}>ID: {pokemon.id}</Text>
        <Text style={styles.info}>Altura: {pokemon.height / 10} m</Text>
        <Text style={styles.info}>Peso: {pokemon.weight / 10} kg</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Tipos</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map((typeInfo, index) => (
            <View 
              key={index} 
              style={[styles.typeBox, { backgroundColor: getTypeColor(typeInfo.type.name) }]}
            >
              <Text style={styles.typeText}>{typeInfo.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        {pokemon.stats.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statName}>{formatStatName(stat.stat.name)}:</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
            <View style={styles.statBarContainer}>
              <View 
                style={[
                  styles.statBar, 
                  { width: `${Math.min(stat.base_stat, 100)}%` },
                  { backgroundColor: getStatColor(stat.base_stat) }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {pokemon.abilities.map((ability, index) => (
          <Text key={index} style={styles.info}>
            • {ability.ability.name.replace('-', ' ')}
            {ability.is_hidden && ' (Oculta)'}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}


function formatStatName(statName) {
  const names = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'Ataque Esp.',
    'special-defense': 'Defensa Esp.',
    'speed': 'Velocidad'
  };
  return names[statName] || statName;
}

function getStatColor(value) {
  if (value < 50) return '#ff5959';
  if (value < 80) return '#ffcb05';
  return '#32cd32';
}

function getTypeColor(type) {
  const colors = {
    'normal': '#A8A77A',
    'fire': '#EE8130',
    'water': '#6390F0',
    'electric': '#F7D02C',
    'grass': '#7AC74C',
    'ice': '#96D9D6',
    'fighting': '#C22E28',
    'poison': '#A33EA1',
    'ground': '#E2BF65',
    'flying': '#A98FF3',
    'psychic': '#F95587',
    'bug': '#A6B91A',
    'rock': '#B6A136',
    'ghost': '#735797',
    'dragon': '#6F35FC',
    'dark': '#705746',
    'steel': '#B7B7CE',
    'fairy': '#D685AD'
  };
  return colors[type] || '#777';
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 8,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
    textTransform: 'capitalize',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  typeBox: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statName: {
    width: 100,
    fontSize: 16,
  },
  statValue: {
    width: 30,
    fontSize: 16,
    textAlign: 'right',
    marginRight: 8,
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  statBar: {
    height: 10,
    borderRadius: 5,
  }
});