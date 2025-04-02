import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

export default function PokemonList({ navigation }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => response.json())
      .then((json) => {
        const fetches = json.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        
        Promise.all(fetches).then((pokemonDetails) => setData(pokemonDetails));
      })
      .catch((error) => console.error(error));
  }, []);
  

  const formatNumber = (id) => {
    return id.toString().padStart(3, '0');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pokemonCard} 
      onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}
    >
      <View style={[styles.pokemonCardInner]}>
        <Text style={styles.numberText}>{formatNumber(item.id)}</Text>
        <Image 
          source={{ uri: item.sprites.front_default }} 
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardSize = width / 5 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  listContent: {
    padding: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  pokemonCard: {
    width: cardSize,
    height: cardSize,
    margin: 5,
  },
  pokemonCardInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
 
  numberText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 2,
  },
  pokemonImage: {
    width: cardSize * 0.7,
    height: cardSize * 0.7,
  },
});