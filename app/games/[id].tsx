import { modoAdm } from '@/src/config/appConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState<any>(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function loadGame() {
      const saved = await AsyncStorage.getItem("@app_data_jogos");
      const games = saved ? JSON.parse(saved) : [];

      const selectedGame = games.find(
        (item: any) => String(item.id) === String(id),
      );

      setGame(selectedGame);
    }

    loadGame();
  }, [id]);

  const addToCart = async () => {
    const saved = await AsyncStorage.getItem("@cart_games");
    const cart = saved ? JSON.parse(saved) : [];

    const exists = cart.some((item: any) => item.id === game.id);
    if (exists) return;

    cart.push(game);
    await AsyncStorage.setItem("@cart_games", JSON.stringify(cart));
    setInCart(true);
  };

  const checkCart = async () => {
    const saved = await AsyncStorage.getItem("@cart_games");
    const cart = saved ? JSON.parse(saved) : [];

    const exists = cart.some((item: any) => item.id === game?.id);
    setInCart(exists);
  };

  useFocusEffect(
    useCallback(() => {
      if (game) checkCart();
    }, [game]),
  );

  if (!game) return <Text style={{ color: "#fff" }}>Jogo não encontrado</Text>;

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
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  priceCard: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    padding: 10,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#262626',
  },

  price: {
    color: '#2bff00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  gameText: {
    color: '#bebebe',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  detailsContainer: {
    gap: 12,
    paddingBottom: 50,
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
