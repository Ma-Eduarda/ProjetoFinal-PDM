import CardDev from '@/components/cards/CardDev';
import { ThemedView } from '@/components/themed-view';
import { IDevs } from '@/interfaces/IDevs';
import { dataDevs } from '@/src/data/devs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../../components/Header";


export default function DevScreen() {
  const [devs, setDevs] = useState<IDevs[]>([]);

  useEffect(() => {
    loadDevs();
  }, []);

  const loadDevs = async () => {
    try {
      const saved = await AsyncStorage.getItem('@app_data_devs');
      if (saved) {
        setDevs(JSON.parse(saved));
      } else {
        await AsyncStorage.setItem('@app_data_devs', JSON.stringify(dataDevs));
        setDevs(dataDevs);
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais: ', error);
    }
  };

  const handlePress = (id: string) => {
    router.push(`/screens/devsDetailsScreen?id=${id}`);
  };

  const goAdd = () => {
    router.push(`/screens/devsDetailsScreen`);
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header title="BuyGames" />

      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={goAdd} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={devs}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardDev
            key={item.id}
            nome={item.nome}
            data_fundacao={item.date_fundacao}
            jogos_desenvolvidos={item.jogos_desenvolvidos}
            image={item.image}
            onPress={() => handlePress(item.id.toString())}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerContainer: {
    backgroundColor: '#ecd503ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerButton: {
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: { padding: 16 },
  headerButtonText: {
    color: '#0400ff',
    fontWeight: 'bold',
    fontSize: 20,
  },

});
