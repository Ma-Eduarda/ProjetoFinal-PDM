import Header from '@/components/Header';
import { ThemedView } from '@/components/themed-view';
import UserCard from '@/components/cards/UserCard';
import { IUser } from '@/interfaces/IUser';
import { dataUsers } from '@/src/data/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserScreen() {
    const [users, setUsers] = useState<IUser[]>([])
    const router = useRouter();

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        try {
            const saved = await AsyncStorage.getItem('@app_data_users');
            if (saved) {
                setUsers(JSON.parse(saved));
            } else {
                await AsyncStorage.setItem('@app_data_users', JSON.stringify(dataUsers));
                setUsers(dataUsers);
            }
        } catch (error) {
            console.error('Erro ao carregar dados iniciais: ', error);
        }
    };

    const saveUser = async (novoUser: IUser) => {
        const listaUser = [...users, novoUser];
        await AsyncStorage.setItem('@app_data_users', JSON.stringify(listaUser));
        setUsers(listaUser);
    };

    const onAdd = (nome: string, email: string, imagem: string) => {
        const newUser: IUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            nome,
            email,
            imagem,
        };
        saveUser(newUser);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="BuyGames" />

            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/screens/usersDetailsScreen",
                            params: {}
                        })
                    }
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>+</Text>
                </TouchableOpacity>
            </ThemedView>

            {users.length > 0 ? (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <UserCard
                            user={item}
                            onPress={() => router.push({
                                pathname: "/screens/usersDetailsScreen",
                                params: { id: item.id.toString() }
                            })}
                            onDelete={async () => {
                                const filtered = users.filter(u => u.id !== item.id);
                                await AsyncStorage.setItem('@app_data_users', JSON.stringify(filtered));
                                setUsers(filtered);
                            }}
                        />
                    )}
                />
            ) : (
                <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
                    Nenhum usuário encontrado.
                </Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerContainer: {
        backgroundColor: '#ecd503',
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
    headerButtonText: {
        color: '#0400ff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    listContent: {
        padding: 16,
    },
});