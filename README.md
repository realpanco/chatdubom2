# Roblox TikTok Live - App Mobile iOS 16+ (Expo)

Aplicativo nativo iOS / iPadOS desenvolvido com **Expo SDK 58 (React Native)** com estética **Ultra Cyberpunk / Glassmorphism iOS 16+**.

---

## 📱 Recursos do Aplicativo

- **Glassmorphism com BlurView Real**: Componentes translúcidos com bordas de neon (`#00F0FF` e `#FF007F`).
- **Feedback Háptico iOS**: Gatilhos de vibração precisa (`expo-haptics`) em botões, abas e salvamento.
- **Sincronização em Tempo Real (Polling 1.5s)**:
  - Status da Live TikTok (Online / Offline).
  - Contador de Spawns, Emotes e Presentes.
  - Feed de eventos da live ao vivo.
- **Configurações Completas (Mesmas do Dashboard Web)**:
  - ⚙️ **Geral**: IP do Servidor Bridge, Usuário TikTok, Session ID, IDC Datacenter, Polling.
  - 💃 **Emotes & Músicas**: Mapeamento de IDs da Loja de Avatar, Sound IDs contínuos e palavras-chave de chat solto.
  - 🔊 **Sons & Aura**: Sons de Spawn, Roleta de Aura, Tiers de Aura (8-10, 5-7, 4-3, 2-0) e Divine Size.
  - 🎁 **Presentes**: Escala multiplicadora (tamanho do avatar) e Boost de Aura para cada presente.
  - 🎥 **Câmera**: Velocidade orbital, distância, altura e FOV.
  - 🧪 **Testes**: Disparo manual de Spawn, Emote Stadium, Rosa e Divine Size direto no Roblox Studio pelo celular.
  - ⚡ **Feed**: Registro instantâneo dos últimos acontecimentos.

---

## 🚀 Como Executar no iOS

### 1. Iniciar em modo de Desenvolvimento (Expo Go)
No terminal:
```bash
cd C:\Users\victo\RobloxTikTokLiveApp
npx expo start
```
Escaneie o QR Code com a câmera do seu iPhone (com o app **Expo Go** instalado).

### 2. Gerar arquivo .IPA para instalação direta no iPhone

Você pode gerar o arquivo `.ipa` utilizando o EAS Build na nuvem (sem precisar de Mac):
```bash
cd C:\Users\victo\RobloxTikTokLiveApp
npx eas-cli login
npx eas-cli build --platform ios --profile preview
```
Ou para compilação local (em ambiente macOS):
```bash
npx expo run:ios
```
"# chatdubom2" 
"# chatdubom2" 
"# chatdubom2" 
"# chatdubom2" 
