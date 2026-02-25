import { modoAdm } from '@/src/config/appConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabsLayout() {
  const [cartCount, setCartCount] = useState(0);
  const segments = useSegments();

  const loadCartCount = async () => {
    const saved = await AsyncStorage.getItem("@cart_games");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCartCount(parsed.length);
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, [segments]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffffff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#121212",
          height: 100,
          paddingBottom: 5,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Loja",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" size={size} color={color} />),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrinho",
          href: modoAdm ? null : undefined,
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="cart" size={size} color={color} />

              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          href: modoAdm ? null : undefined,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="devscreen"
        options={{
          title: "Desenvolvedoras",
          href: modoAdm ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="gamescreen"
        options={{
          title: "Jogos",
          href: modoAdm ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gear" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "Usuários",
          href: modoAdm ? undefined : null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});