// Em screens/LoginScreen.js

import { Ionicons } from '@expo/vector-icons'; // Importe os ícones
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'; // NOVO: importamos useEffect
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// NOVO: Importamos o 'db' (nosso banco de dados) e as funções do Firestore
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // --- NOVO: "OUVINTE" DO FIREBASE PARA LOGIN FACIAL ---
  useEffect(() => {
    // Aponta para o documento exato que o Python está atualizando
    const docRef = doc(db, "gatilhos", "app_mobile");
    
    console.log("Ouvinte de Login Facial ATIVADO na Tela de Login.");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const dados = docSnap.data();
        
        // Se o status for LOGIN_SUCCESS
        if (dados.status === 'LOGIN_SUCCESS') {
          console.log(`Login facial recebido para o usuário: ${dados.user}`);
          
          // --- A "AÇÃO" DE INTEGRAÇÃO ACONTECE AQUI! ---
          Alert.alert(
            "Login Facial Concluído!",
            `Bem-vindo, ${dados.user}!`,
            [
              // Navega para o App depois que o usuário aperta OK
              { text: "OK", onPress: () => navigation.replace('App') }
            ]
          );
          
          // NOTA: Em um app real, precisaríamos resetar o 'status' no Firebase
          // mas o delay de 10s no Python vai nos proteger de loops.
        }
      }
    });

    // Limpa o "ouvinte" quando a tela é fechada
    return () => {
      console.log("Ouvinte de Login Facial DESATIVADO.");
      unsubscribe();
    };
  }, [navigation]); // Depende da 'navigation' para poder redirecionar
  // --- FIM DO OUVINTE ---

  // Função de login manual (usuário/senha)
  const handleLogin = async () => {
    if (email.toLowerCase() === 'admin' && password === '1234') {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.replace('App');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Use "admin" e "1234"');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Datarium</Text>
      <Text style={styles.subtitle}>Entrar na sua conta</Text>
      
      {/* NOVO: Ícone de Câmera para Login Facial */}
      <View style={styles.facialLoginContainer}>
        <Ionicons name="camera-outline" size={64} color="#FFD700" />
        <Text style={styles.facialLoginText}>
          Posicione seu rosto na webcam do computador para login facial
        </Text>
      </View>
      
      <Text style={styles.orText}>- OU -</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail (use 'admin')"
        placeholderTextColor="#A0AEC0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha (use '1234')"
        placeholderTextColor="#A0AEC0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar com Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos atualizados
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
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#A0AEC0',
    marginBottom: 25, // Reduzido
  },
  
  // NOVO: Estilos do Login Facial
  facialLoginContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  facialLoginText: {
    color: '#A0AEC0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  orText: {
    color: '#A0AEC0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Fim dos novos estilos

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
  loginButton: {
    width: '100%',
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
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

export default LoginScreen;