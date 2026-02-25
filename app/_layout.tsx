import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="games/[id]" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/cteladev" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/ctelagames" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/usersDetailsScreen" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/devsDetailsScreen" options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="screens/gamesDetailsScreen" options={{ headerShown: true, title: "" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
