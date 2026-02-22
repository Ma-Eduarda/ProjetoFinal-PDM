import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type GameCardProps = { 
  title: string; 
  price: string; 
  image: string;
  onPress?: () => void;
};

export default function GameCard({ title, price, image, onPress }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>R$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  image: { 
    width: "100%",
    height: 220
  },
  info: {
    padding: 18
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {
    color: "#2bff00",
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600"
  },
});