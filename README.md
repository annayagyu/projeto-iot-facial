Projeto de Integração: Reconhecimento Facial e App Mobile

Este projeto demonstra a integração entre um módulo de reconhecimento facial em Python (rodando localmente) e uma aplicação mobile "cenográfica" em React Native, utilizando o Firebase Firestore como ponte de comunicação para realizar um login facial opcional.

Arquitetura

Módulo Python (Pasta PROJETO_IOT):

train.py: Captura imagens da webcam e treina um modelo LBPH para reconhecer um usuário específico. Salva o modelo em trained_model.yml.

recognize.py: Usa a webcam, detecta rostos com Haar Cascade, reconhece o usuário treinado usando o modelo LBPH e envia um gatilho (LOGIN_SUCCESS) para o Firebase Firestore.

haarcascade_frontalface_default.xml: Arquivo de modelo pré-treinado do OpenCV para detecção de rostos.

serviceAccountKey.json: Chave privada para autenticar o script Python no Firebase ( NÃO INCLUA ESTE ARQUIVO NO GIT ).

App Mobile (Pasta AppMobileCenografico):

Desenvolvido com React Native (Expo).

LoginScreen.js: Tela inicial que oferece login manual (email/senha) ou login facial opcional. Ouve o Firebase por um gatilho LOGIN_SUCCESS quando o botão "Entrar com Rosto" é pressionado.

HomeScreen.js, PortfolioScreen.js, etc.: Telas do app após o login.

firebaseConfig.js: Configurações de conexão do app mobile com o Firebase ( NÃO INCLUA ESTE ARQUIVO NO GIT se for público ).

Firebase Firestore:

Atua como intermediário.

Uma coleção gatilhos contém um documento app_mobile.

O script Python (recognize.py) escreve neste documento (status: 'LOGIN_SUCCESS', user: 'admin').

O App Mobile (LoginScreen.js) lê (ouve) as atualizações neste documento para acionar o login.

Configuração do Ambiente (Novo Computador)

1. Software Necessário:

Node.js: Baixe e instale a versão LTS de nodejs.org.

Python: Instale pela Microsoft Store (procure por "Python 3.12" ou mais recente). Isso geralmente configura o PATH corretamente no Windows.

Expo Go App: Instale no seu celular (Android/iOS) pela loja de aplicativos.

2. Configurar Projeto Python (PROJETO_IOT):

Abra um terminal (CMD ou PowerShell).

Navegue até a pasta do projeto Python (ex: cd C:\Caminho\Para\O\PROJETO_IOT).

Instale as bibliotecas Python:

pip install opencv-contrib-python numpy firebase-admin


Firebase Setup:

Crie um projeto no Firebase Console.

No menu lateral, vá em "Criação" > "Firestore Database".

Crie um banco de dados no modo de teste.

Vá em "Configurações do Projeto" (ícone ⚙️) > "Contas de serviço".

Clique em "Gerar nova chave privada" e baixe o arquivo .json.

Renomeie o arquivo baixado para serviceAccountKey.json e coloque-o dentro da pasta do projeto Python.

Arquivos Necessários na Pasta: Certifique-se de que a pasta PROJETO_IOT contém:

train.py

recognize.py (a versão com Firebase)

haarcascade_frontalface_default.xml

serviceAccountKey.json

3. Configurar App Mobile (AppMobileCenografico):

Abra um outro terminal.

Navegue até a pasta do projeto mobile (ex: cd C:\Caminho\Para\O\AppMobileCenografico).

Instale as dependências do Node.js:

npm install


Instale a biblioteca Firebase do Expo (se ainda não o fez):

npx expo install firebase


Firebase Setup:

No Console do Firebase, vá em "Configurações do Projeto" (ícone ⚙️) > Aba "Geral".

Role para baixo até "Seus aplicativos".

Clique no ícone da Web (</>) para "Adicionar app".

Dê um apelido (ex: "App-Mobile") e clique em "Registrar app".

O Firebase mostrará um objeto firebaseConfig. Copie este objeto inteiro.

Na raiz da pasta AppMobileCenografico, crie/edite o arquivo firebaseConfig.js.

Cole o código abaixo nele, substituindo o comentário // ... COLE AQUI ... pelo objeto firebaseConfig que você copiou:

// Em firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importe getFirestore

// Cole sua configuração do Firebase aqui
const firebaseConfig = {
  // ... COLE AQUI O OBJETO firebaseConfig ...
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..." // Opcional
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados (Firestore) para usarmos em outras telas
export const db = getFirestore(app);


Verifique os Arquivos: Certifique-se de que os arquivos LoginScreen.js e HomeScreen.js dentro da pasta screens estão atualizados com as últimas versões que fornecemos (Login com botão opcional, Home sem ouvinte).

Como Rodar o Projeto Integrado

Passo 1: Treinar o Rosto (Faça apenas uma vez por usuário/rosto)

Abra um terminal na pasta PROJETO_IOT.

Execute: python train.py

Siga as instruções: olhe para a câmera e espere capturar as 30 imagens.

Verifique se o arquivo trained_model.yml foi criado na pasta.

Passo 2: Iniciar o App Mobile

Abra um segundo terminal na pasta AppMobileCenografico.

Execute: npx expo start -c (o -c limpa o cache, importante após mudanças)

Espere o QR Code aparecer.

Abra o Expo Go no seu celular e escaneie o QR Code.

O app abrirá na Tela de Login. Deixe-o nesta tela.

Passo 3: Iniciar o Reconhecimento Facial

Volte para o primeiro terminal (na pasta PROJETO_IOT).

Execute: python recognize.py

Uma janela da webcam abrirá.

Passo 4: Realizar o Login Facial

No App Mobile (na Tela de Login), clique no botão "Entrar com Rosto". O botão ficará cinza e mostrará "Aguardando...".

Posicione seu rosto (o que foi treinado) na frente da webcam do PC.

Observe:

A janela da webcam no PC deve reconhecer seu rosto (ex: "admin").

O terminal do Python deve indicar "Gatilho enviado com sucesso!".

O App Mobile deve mostrar um alerta "Login Facial Concluído!".

Ao clicar "OK" no alerta, o App Mobile deve navegar para a tela Home (Dashboard).

Alternativa: Login Manual

Você também pode usar o email admin e a senha 1234 para entrar, ou criar uma conta pelo link "Cadastre-se".

Observações

O script recognize.py tem um DELAY_ENTRE_GATILHOS para evitar múltiplos logins seguidos.

O App Mobile tem um timeout (tempo limite) para o login facial opcional. Se nenhum rosto for detectado em 20 segundos após clicar no botão, ele mostrará um erro.

A precisão do reconhecimento facial (LBPH) depende muito da iluminação e do ângulo do rosto durante o treinamento e o reconhecimento. Ajuste o CONFIDENCE_THRESHOLD no recognize.py se necessário (valores menores são mais rigorosos).
