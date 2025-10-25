// Em screens/ProfileScreen.js

import { useNavigation } from "@react-navigation/native";
import { Alert, Button, StatusBar, StyleSheet, Text, View } from "react-native";
// Removemos AsyncStorage, não precisamos dele no mock

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Função de Logout (vinda do seu código ProfileScreen)
  const handleLogout = async () => {
    try {
      // Como não estamos salvando nada no AsyncStorage, podemos só simular
      Alert.alert('Sessão encerrada', 'Você foi desconectado com sucesso.');

      // Usa navigation.reset() para voltar à tela de login
      // 'Auth' será o nome do nosso grupo de telas de login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });

    } catch (error) {
      console.error('Erro ao encerrar a sessão:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao encerrar a sessão.');
    }
  };

  return (
    // Usamos um layout simples baseado no seu
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.label}>
        Esta é a tela de perfil. Em um app real, aqui você poderia
        editar seus dados.
      </Text>

      <View style={styles.logoutButtonContainer}>
        <Button title="Sair da Conta" onPress={handleLogout} color="#FF5C5C" />
      </View>
    </View>
  );
};

// Estilos baseados no seu ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E172A",
    padding: 20,
    paddingTop: StatusBar.currentHeight + 40, // Mais espaço
  },
  title: {
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#A0AEC0",
    marginBottom: 20,
    lineHeight: 22,
  },
  logoutButtonContainer: {
    marginTop: 40,
  },
});

export default ProfileScreen;