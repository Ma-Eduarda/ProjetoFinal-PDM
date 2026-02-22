import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
    const user = {
        name: "Rafael",
        email: "Rafael@email.com",
        avatar: "https://thumbs.dreamstime.com/b/um-bloco-retangular-em-minecraft-feito-de-erva-e-sujeira-forma-adornado-com-comumente-utilizados-como-brinquedo-educativo-321468533.jpg"
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.banner}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="cart-outline" size={20} color="#fff" />
                    <Text style={styles.menuText}>Meus Pedidos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="settings-outline" size={20} color="#fff" />
                    <Text style={styles.menuText}>Configurações</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },

    banner: {
        height: 180,
        backgroundColor: "#1f1f1f",
        justifyContent: "center",
        alignItems: "center",
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },

    content: {
        flex: 1,
        padding: 25,
    },

    name: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },

    email: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 4,
        marginBottom: 20,
    },

    divider: {
        height: 1,
        backgroundColor: "#2a2a2a",
        marginBottom: 20,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingVertical: 15,
    },

    menuText: {
        color: "#fff",
        fontSize: 16,
    },
    
    logoutContainer: {
        justifyContent: "flex-end",
        padding: 20,
        marginBottom: 20,
    },

    logoutButton: {
        marginTop: 30,
        backgroundColor: "#1f1f1f",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    logoutText: {
        color: "#ff4444",
        fontWeight: "bold",
    },
});