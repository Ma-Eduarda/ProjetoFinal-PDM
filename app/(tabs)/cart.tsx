import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  const loadCart = async () => {
    try {
      const saved = await AsyncStorage.getItem('@cart_games');
      if (saved) {
        setCart(JSON.parse(saved));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const removeItem = async (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem('@cart_games', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Carrinho" />

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/games/[id]',
                    params: { id: item.id.toString() }
                  })
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>R$ {item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                >
                  <Ionicons name="trash" size={18} color="#ee1414" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: R$ {total.toFixed(2)}
            </Text>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },

  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 10
  },

  info: {
    flex: 1
  },

  card: {
    backgroundColor: '#1e1e1e',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  price: {
    color: '#2bff00',
    marginTop: 5,
    fontSize: 16,
  },

  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  removeText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },

  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  checkoutButton: {
    backgroundColor: '#2bff00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  checkoutText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});