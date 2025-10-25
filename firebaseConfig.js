// Em firebaseConfig.js (na raiz do projeto)

// Importe as bibliotecas necessárias
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- IMPORTANTE
// getAnalytics não é necessário para o nosso teste

// Sua configuração do Firebase (que você colou)
const firebaseConfig = {
  apiKey: "AIzaSyBvlImOLrk3QaY4EImaphncdZO8hXJpuiI",
  authDomain: "projeto-iot-demo.firebaseapp.com",
  projectId: "projeto-iot-demo",
  storageBucket: "projeto-iot-demo.firebasestorage.app",
  messagingSenderId: "333696991162",
  appId: "1:333696991162:web:aa5d6a9ec8a71056d9a783",
  measurementId: "G-WB628TBPK6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados (Firestore) para usarmos em outras telas
export const db = getFirestore(app); // <-- ESTA LINHA ESTAVA FALTANDO

