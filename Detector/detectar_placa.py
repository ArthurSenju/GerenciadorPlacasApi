import cv2
import easyocr
import requests

# URL da API para obter todas as placas
URL_OBTER_PLACAS = "http://localhost:5000/api/placas/todas"

# Inicializa OCR
reader = easyocr.Reader(['pt'])

# 🔥 1️⃣ Carrega todas as placas do banco uma única vez (usa um conjunto para busca rápida)
def carregar_placas_do_banco():
    try:
        resposta = requests.get(URL_OBTER_PLACAS)
        if resposta.status_code == 200:
            placas = resposta.json()  # Supondo que a API retorna uma lista de strings
            return set(placas)  # Usa um conjunto (set) para buscas rápidas
        else:
            print("❌ Erro ao buscar placas do banco")
            return set()
    except Exception as e:
        print(f"Erro ao conectar com API: {e}")
        return set()

# 🔥 2️⃣ Função para detectar texto em um frame da câmera
def detectar_texto(frame):
    resultados = reader.readtext(frame)
    for _, texto, confianca in resultados:
        if len(texto) >= 7:  # Apenas textos que pareçam placas
            return texto
    return None

# 🔥 3️⃣ Carregamos as placas do banco uma única vez no início
placas_registradas = carregar_placas_do_banco()
print(f"✅ {len(placas_registradas)} placas carregadas do banco!")

# 🔥 4️⃣ Captura de vídeo em tempo real
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break  # Sai do loop se a captura falhar

    frame_cinza = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    placa_detectada = detectar_texto(frame_cinza)

    if placa_detectada:
        print(f"📸 Placa detectada: {placa_detectada}")

        # 🔥 5️⃣ Faz a verificação localmente no conjunto
        if placa_detectada in placas_registradas:
            print(f"⚠️ ALERTA! Placa {placa_detectada} encontrada no banco de dados!")

    cv2.imshow("Detecção de Placas", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break  # Pressione "q" para sair

cap.release()
cv2.destroyAllWindows()
