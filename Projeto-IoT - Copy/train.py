import cv2
import os
import numpy as np

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
data_dir = 'data'
user_id = 1
amostras_num = 30

if not os.path.exists(data_dir):
    os.makedirs(data_dir)

cap = cv2.VideoCapture(0)
count = 0

print("Olhe para a câmera. Capturando imagens...")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    for (x, y, w, h) in faces:
        count += 1
        face_img = gray[y:y + h, x:x + w]
        cv2.imwrite(f"{data_dir}/user.{user_id}.{count}.jpg", face_img)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, f"Capturando {count}/{amostras_num}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9,
                    (36, 255, 12), 2)

    cv2.imshow('Capturando Imagens', frame)

    if cv2.waitKey(1) & 0xFF == ord('q') or count >= amostras_num:
        break

cap.release()
cv2.destroyAllWindows()

#Treinando o modelo
faces = []
labels = []

for file in os.listdir(data_dir):
    if file.endswith('.jpg'):
        img_path = os.path.join(data_dir, file)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        label = int(file.split('.')[1])
        faces.append(img)
        labels.append(label)

recognizer = cv2.face.LBPHFaceRecognizer_create(radius=1, neighbors=8, grid_x=8, grid_y=8)  # Parâmetros ajustáveis aqui
recognizer.train(faces, np.array(labels))
recognizer.save('trained_model.yml')

print("Treinamento concluído!")