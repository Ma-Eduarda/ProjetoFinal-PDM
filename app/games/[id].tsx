import { dataGames } from '@/src/data/games';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const game = dataGames.find((g) => g.id.toString() === id);

  if (!game) return <Text>Jogo não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: game.image }} style={styles.image} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{game.title}</Text>

        <View style={styles.priceCard}>
          <Text style={styles.price}>R$ {game.price}</Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>

        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Sobre o jogo</Text>
          <Text style={styles.gameText}>{game.info_game}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Data de Lançamento</Text>
            <Text style={styles.detailValue}>{game.release_date}</Text>
          </View>
          
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Desenvolvedora</Text>
            <Text style={styles.detailValue}>{game.dev_game}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: { 
    width: '100%', 
    height: '100%',
  },
  content: {
    padding: 20,
  },
  title: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  priceCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 25,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',

  },
  price: { 
    color: '#2bff00', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  gameText: {
    color: '#b0b0b0', 
    fontSize: 15, 
    lineHeight: 24,
  },
  detailsContainer: {
    gap: 12,
  },
  detailCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  detailLabel: {
    color: '#919191',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  buyButton: {
    backgroundColor: '#2bff00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 100,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
