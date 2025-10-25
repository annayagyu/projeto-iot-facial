import cv2
import firebase_admin
import time
from firebase_admin import credentials, firestore

# --- Configuração ---
CAMINHO_CHAVE_FIREBASE = 'serviceAccountKey.json'

# Mapeia o ID do usuário (do train.py) para um nome de usuário
# O train.py [cite: SprintIot-main.zip/SprintIot-main/SPRINT25/train.py] usa 'user_id = 1'
MAPA_USUARIOS = {
    1: "admin"  # O Label '1' será reconhecido como 'admin'
}

# --- Variáveis Globais ---
ultimo_gatilho_enviado = 0
DELAY_ENTRE_GATILHOS = 10  # 10 segundos


# --- Funções do Firebase ---
def inicializar_firebase():
    """Inicializa a conexão com o Firebase."""
    try:
        cred = credentials.Certificate(CAMINHO_CHAVE_FIREBASE)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase inicializado com sucesso!")
        return db
    except Exception as e:
        print(f"ERRO CRÍTICO no Firebase: {e}")
        return None


def enviar_gatilho_login(db, userId):
    """Envia o gatilho de login para o Firebase, se o delay já passou."""
    global ultimo_gatilho_enviado

    agora = time.time()

    # Evita spam de gatilhos
    if (agora - ultimo_gatilho_enviado) < DELAY_ENTRE_GATILHOS:
        return

    try:
        print(f"\n--- Rosto '{userId}' Reconhecido! Enviando gatilho de login... ---")
        doc_ref = db.collection('gatilhos').document('app_mobile')
        doc_ref.set({
            'status': 'LOGIN_SUCCESS',
            'user': userId,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        print("Gatilho enviado com sucesso!")

        ultimo_gatilho_enviado = agora

    except Exception as e:
        print(f"ERRO ao enviar gatilho: {e}")


# --- Função Principal (do seu recognize.py) ---
def main():
    # Inicializa o Firebase
    db = inicializar_firebase()
    if db is None:
        return

    # Configurações do OpenCV (do seu script)
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read('trained_model.yml')  # Carrega o rosto que acabamos de treinar

    cap = cv2.VideoCapture(0)

    scale_factor = 1.1
    min_neighbors = 5

    print("Iniciando reconhecimento...")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=scale_factor, minNeighbors=min_neighbors)

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y + h, x:x + w]
            label, confidence = recognizer.predict(roi_gray)

            text = "Desconhecido"

            # Ajuste o 'confidence' se necessário.
            # O padrão do LBPH é: quanto MENOR, mais confiante.
            # 100 é um valor bem permissivo.
            if confidence < 100:
                # Converte o 'label' (ex: 1) para um nome (ex: 'admin')
                user_id_string = MAPA_USUARIOS.get(label, "Desconhecido")
                text = f"{user_id_string} (Conf: {int(confidence)})"

                # --- AÇÃO DE INTEGRAÇÃO ---
                if user_id_string != "Desconhecido":
                    enviar_gatilho_login(db, user_id_string)
            else:
                text = f"Desconhecido (Conf: {int(confidence)})"

            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (36, 255, 12), 2)

        cv2.imshow('Reconhecimento Facial', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
