// Em screens/RegisterScreen.js

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    
    // --- LÓGICA "CENOGRÁFICA" ---
    // Alerta idêntico ao da imagem
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    // Layout EXATAMENTE o que você mandou
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Datarium</Text>
      <Text style={styles.subtitle}>Crie uma nova conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#A0AEC0"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A0AEC0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua Senha"
        placeholderTextColor="#A0AEC0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Faça o login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Seus estilos originais
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    color: '#FFD700', // Amarelo
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#A0AEC0',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E2841',
    color: '#FFF',
    borderColor: '#2D3748',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#FFD700', // Amarelo
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#0E172A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#A0AEC0',
    fontSize: 14,
  },
});

export default RegisterScreen;