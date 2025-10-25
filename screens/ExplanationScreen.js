// Em screens/ExplanationsScreen.js

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Tela "Cenográfica" para a aba Explicações
const ExplanationsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Ionicons name="bulb-outline" size={60} color="#FFD700" />
        <Text style={styles.title}>Explicações</Text>
        <Text style={styles.subtitle}>
          Esta é a tela de Explicações.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E172A',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ExplanationsScreen;