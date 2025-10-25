// Em App.js (na raiz do projeto)

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe TODAS as telas que criamos
import ExplanationsScreen from './screens/ExplanationScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

// Crie os dois tipos de navegador
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Este é o navegador principal do App (DEPOIS de logar)
 * Ele mostra as 4 ABAS
 */
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Esconde o cabeçalho de cada aba
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Portfólio') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Explicações') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Estilos das abas (baseado nas cores do seu app e imagens)
        tabBarActiveTintColor: '#FFD700', // Amarelo
        tabBarInactiveTintColor: '#A0AEC0', // Cor da aba inativa
        tabBarStyle: {
          backgroundColor: '#0E172A', // Fundo azul escuro
          borderTopColor: '#2D3748', // Linha sutil no topo
          paddingBottom: 5, 
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      {/* Nossas QUATRO abas */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Portfólio" component={PortfolioScreen} />
      <Tab.Screen name="Explicações" component={ExplanationsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Um sub-navegador SÓ para as telas de Login e Cadastro
 */
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

/**
 * Este é o navegador "Raiz".
 * Ele controla se o usuário vê as telas de Auth ou as telas do App.
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth" // Começa na autenticação
        screenOptions={{
          headerShown: false, // Esconde o cabeçalho de toda a pilha
        }}
      >
        {/* Grupo de Autenticação */}
        <Stack.Screen name="Auth" component={AuthStack} />
        
        {/* Grupo Principal do App (com as abas) */}
        <Stack.Screen name="App" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}