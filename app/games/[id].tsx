import { modoAdm } from '@/src/config/appConfig';
import { dataGames } from '@/src/data/games';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const [inCart, setInCart] = useState(false);
  const game = dataGames.find((g) => g.id.toString() === id);

  if (!game) return <Text>Jogo não encontrado</Text>;

  const addToCart = async () => {
    const saved = await AsyncStorage.getItem('@cart_games');
    const cart = saved ? JSON.parse(saved) : [];

    const exists = cart.some((item: { id: number }) => item.id === game.id);
    if (exists) return;

    cart.push(game);
    await AsyncStorage.setItem('@cart_games', JSON.stringify(cart));
    setInCart(true);
  };

  const checkCart = async () => {
    const saved = await AsyncStorage.getItem('@cart_games');
    const cart = saved ? JSON.parse(saved) : [];

    const exists = cart.some((item: { id: number }) => item.id === game.id);
    setInCart(exists);
  };

  useFocusEffect(
    useCallback(() => {
      checkCart();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: game.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{game.title}</Text>

        <View style={styles.priceCard}>
          <Text style={styles.price}>R$ {game.price}</Text>

          {(!modoAdm) && (
          <TouchableOpacity
            style={[
              styles.buyButton,
              inCart && { backgroundColor: '#464545' }
            ]}
            onPress={async () => {
              if (inCart) {
                router.push('/cart');
              } else {
                await addToCart();
              }
            }}
          >
            <Ionicons
              name={inCart ? "cart" : "cart-outline"}
              size={20}
              color="#000"
            />
            <Text style={styles.buyButtonText}>
              {inCart ? "Ir para o Carrinho" : "Adicionar ao Carrinho"}
            </Text>
          </TouchableOpacity>
          )}

          {(modoAdm) && (
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          )}

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
    height: 320,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  priceCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#262626',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2bff00',
    padding: 10,
    borderRadius: 10,
  },
  buyButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
