// Em screens/HomeScreen.js

import { Ionicons } from '@expo/vector-icons';
import React from 'react'; // Removido useEffect, useState
import { Alert, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// REMOVIDO: Imports do Firebase

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  
  // REMOVIDO: Todo o bloco 'useEffect' e 'useState' do ouvinte do Firebase
  
  const mockProfile = {
    experiencia: 'Nenhuma',
    objetivo: 'Preservar Capital',
    risco: 'Moderado',
    horizonte: 'Longo Prazo',
  };
  const mockRecommendations = [
    { id: 1, title: 'CDBs de médio/longo prazo', description: 'Retornos acima da Selic...', type: 'trending-up' },
    { id: 2, title: 'Fundos Multimercado', description: 'Diversificação em renda fixa...', type: 'bar-chart' },
    { id: 3, title: 'Fundos Imobiliários (FIIs)', description: 'Investimento no setor imobiliário...', type: 'business' },
  ];
  const RecommendationCard = ({ recommendation }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={recommendation.type} size={22} color="#FFD700" style={{ marginRight: 8 }} />
        <Text style={styles.cardTitle}>{recommendation.title}</Text>
      </View>
      <Text style={styles.cardDescription}>{recommendation.description}</Text>
      {/* Precisamos importar o Alert para esta função funcionar */}
      <TouchableOpacity style={styles.saibaMaisButton} onPress={() => Alert.alert('Saiba mais', recommendation.title)}>
        <Text style={styles.saibaMaisText}>Saiba Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* REMOVIDO: O banner de sucesso/erro do IoT */}

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </View>
        
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Ionicons name="person-circle-outline" size={26} color="#FFD700" />
            <Text style={styles.profileTitle}>Seu Perfil de Investidor</Text>
          </View>
          <Text style={styles.profileText}>📘 Experiência: {mockProfile.experiencia}</Text>
          <Text style={styles.profileText}>🎯 Objetivo: {mockProfile.objetivo}</Text>
          <Text style={styles.profileText}>⚖️ Risco: {mockProfile.risco}</Text>
          <Text style={styles.profileText}>⏳ Horizonte: {mockProfile.horizonte}</Text>
        </View>
        <View style={styles.recommendationHeader}>
          <Text style={styles.recommendationTitle}>💡 Recomendações Personalizadas</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={width * 0.8 + 15} snapToAlignment="start" decelerationRate="fast" contentContainerStyle={{ paddingRight: 30 }}>
          {mockRecommendations.map((item) => (
            <RecommendationCard key={item.id} recommendation={item} />
          ))}
        </ScrollView>
        <View style={styles.marketSection}>
          <Text style={styles.marketTitle}>📊 Destaques do Mercado</Text>
          <View style={styles.marketRow}>
            <View style={styles.marketCard}><Text style={styles.marketLabel}>Selic</Text><Text style={styles.marketValue}>10,75%</Text></View>
            <View style={styles.marketCard}><Text style={styles.marketLabel}>Ibovespa</Text><Text style={styles.marketValue}>118.450 pts</Text></View>
            <View style={styles.marketCard}><Text style={styles.marketLabel}>Dólar</Text><Text style={styles.marketValue}>R$ 5,02</Text></View>
          </View>
        </View>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Explicações')}>
          <Ionicons name="book-outline" size={20} color="#0E172A" style={{ marginRight: 8 }} />
          <Text style={styles.ctaText}>Ver explicações detalhadas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos (sem o banner)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0E172A' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 30, paddingHorizontal: 15, paddingTop: 10 },
  header: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: StatusBar.currentHeight + 15, paddingHorizontal: 5 },
  headerTitle: { fontSize: 24, color: '#FFD700', fontWeight: 'bold' },
  profileCard: { backgroundColor: '#1E2841', borderRadius: 12, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  profileTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  profileText: { fontSize: 15, color: '#A0AEC0', marginBottom: 5 },
  recommendationHeader: { paddingBottom: 10, marginBottom: 15 },
  recommendationTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold' },
  card: { width: width * 0.8, backgroundColor: '#1E2841', borderRadius: 12, padding: 15, marginRight: 15, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 4, elevation: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
  cardDescription: { fontSize: 14, color: '#A0AEC0', lineHeight: 20, marginBottom: 10 },
  saibaMaisButton: { backgroundColor: '#FFD700', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  saibaMaisText: { color: '#0E172A', fontWeight: 'bold' },
  marketSection: { marginTop: 25, marginBottom: 20 },
  marketTitle: { fontSize: 18, color: '#FFF', fontWeight: 'bold', marginBottom: 12 },
  marketRow: { flexDirection: 'row', justifyContent: 'space-between' },
  marketCard: { flex: 1, backgroundColor: '#1E2841', borderRadius: 10, padding: 12, marginHorizontal: 5, alignItems: 'center' },
  marketLabel: { fontSize: 14, color: '#A0AEC0' },
  marketValue: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', marginTop: 5 },
  ctaButton: { flexDirection: 'row', backgroundColor: '#FFD700', borderRadius: 12, padding: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  ctaText: { color: '#0E172A', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;