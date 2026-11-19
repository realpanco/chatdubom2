import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ApiService } from './src/api';
import { COLORS } from './src/theme';
import { LiveConfig, LiveStatus } from './src/types';
import { DEFAULT_CONFIG } from './src/defaultConfig';

import { GlassCard } from './src/components/GlassCard';
import { GlassInput } from './src/components/GlassInput';
import { GlowButton } from './src/components/GlowButton';
import { LiveStatusHeader } from './src/components/LiveStatusHeader';

type TabKey = 'general' | 'emotes' | 'sounds' | 'gifts' | 'camera' | 'test' | 'feed';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [serverUrl, setServerUrl] = useState<string>('http://127.0.0.1:3000');
  const [config, setConfig] = useState<LiveConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<LiveStatus | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);

  // Campos de teste rápido
  const [testNick, setTestNick] = useState<string>('wsvtn23');
  const [testUser, setTestUser] = useState<string>('VictorViewer');

  useEffect(() => {
    (async () => {
      const url = await ApiService.initServerUrl();
      setServerUrl(url);
      const initialConfig = await ApiService.getConfig();
      setConfig(initialConfig);
    })();
  }, []);

  // Polling em tempo real (1.5s)
  useEffect(() => {
    const interval = setInterval(async () => {
      const liveStatus = await ApiService.getStatus();
      setStatus(liveStatus);
    }, 1500);
    return () => clearInterval(interval);
  }, [serverUrl]);

  const handleTabChange = (tab: TabKey) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const handleSaveConfig = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSaving(true);
    await ApiService.setServerUrl(serverUrl);
    const success = await ApiService.saveConfig(config);
    setSaving(false);

    if (success) {
      Alert.alert('Sucesso', 'Configurações sincronizadas com o servidor Roblox Live!');
    } else {
      Alert.alert(
        'Salvo Localmente',
        'Configurações salvas no app iOS. Não foi possível conectar ao servidor no IP especificado no momento.'
      );
    }
  };

  const runTest = async (payload: Record<string, any>, label: string) => {
    setTesting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const ok = await ApiService.triggerTestEvent(payload);
    setTesting(false);
    if (!ok) {
      Alert.alert('Aviso', `Servidor não respondeu ao teste de ${label}. Verifique a URL do servidor.`);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style="light" />
        <LinearGradient
          colors={COLORS.darkGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          {/* Header Superior Glass Cyberpunk */}
          <View style={styles.topBar}>
            <View style={styles.brandRow}>
              <LinearGradient
                colors={COLORS.accentGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoBadge}
              >
                <Ionicons name="flash" size={18} color="#000" />
              </LinearGradient>
              <View>
                <Text style={styles.brandTitle}>
                  ROBLOX <Text style={{ color: COLORS.cyan }}>LIVE</Text>
                </Text>
                <Text style={styles.brandSubtitle}>iOS 16+ Ultra Edition</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveHeaderBtn}
              onPress={handleSaveConfig}
              disabled={saving}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={COLORS.accentGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveHeaderGrad}
              >
                <Ionicons name="checkmark-done" size={16} color="#000" />
                <Text style={styles.saveHeaderText}>{saving ? '...' : 'Salvar'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Status Header Integrado */}
          <LiveStatusHeader status={status} serverUrl={serverUrl} />

          {/* Navegação por Tabs com Estética iOS */}
          <View style={styles.tabBarContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabBarScroll}
            >
              <TabPill
                label="Geral"
                icon="settings-outline"
                active={activeTab === 'general'}
                onPress={() => handleTabChange('general')}
              />
              <TabPill
                label="Emotes"
                icon="musical-notes-outline"
                active={activeTab === 'emotes'}
                onPress={() => handleTabChange('emotes')}
              />
              <TabPill
                label="Sons & Aura"
                icon="volume-high-outline"
                active={activeTab === 'sounds'}
                onPress={() => handleTabChange('sounds')}
              />
              <TabPill
                label="Presentes"
                icon="gift-outline"
                active={activeTab === 'gifts'}
                onPress={() => handleTabChange('gifts')}
              />
              <TabPill
                label="Câmera"
                icon="videocam-outline"
                active={activeTab === 'camera'}
                onPress={() => handleTabChange('camera')}
              />
              <TabPill
                label="Testes"
                icon="flask-outline"
                active={activeTab === 'test'}
                onPress={() => handleTabChange('test')}
              />
              <TabPill
                label="Feed"
                icon="list-outline"
                active={activeTab === 'feed'}
                onPress={() => handleTabChange('feed')}
              />
            </ScrollView>
          </View>

          {/* Conteúdo Central */}
          <ScrollView
            style={styles.contentScrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'general' && (
              <>
                <GlassCard glow="cyan">
                  <Text style={styles.sectionTitle}>Conexão & Rede</Text>
                  <GlassInput
                    label="Endereço do Servidor (Bridge)"
                    sublabel="No iOS use o IP local do PC (ex: http://192.168.15.13:3000)"
                    value={serverUrl}
                    onChangeText={setServerUrl}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <GlassInput
                    label="Canal TikTok"
                    badge="LIVE"
                    value={config.tiktok_username}
                    onChangeText={(val) => setConfig({ ...config, tiktok_username: val })}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <GlassInput
                    label="Session ID (Auth EulerStream)"
                    sublabel="Permite conexão via autenticação direta segura"
                    value={config.session_id}
                    onChangeText={(val) => setConfig({ ...config, session_id: val })}
                    autoCapitalize="none"
                  />
                  <GlassInput
                    label="Target IDC"
                    value={config.tt_target_idc}
                    onChangeText={(val) => setConfig({ ...config, tt_target_idc: val })}
                    autoCapitalize="none"
                  />
                </GlassCard>

                <GlassCard>
                  <Text style={styles.sectionTitle}>Regras dos Avatares</Text>
                  <GlassInput
                    label="Intervalo de Polling (Segundos)"
                    value={String(config.poll_interval)}
                    onChangeText={(val) =>
                      setConfig({ ...config, poll_interval: parseFloat(val) || 0.8 })
                    }
                    keyboardType="numeric"
                  />
                  <View style={styles.switchRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.switchLabel}>Foco de Câmera Automático</Text>
                      <Text style={styles.switchSub}>
                        Foca a câmera cinematográfica no último jogador que comentou
                      </Text>
                    </View>
                    <Switch
                      value={config.auto_camera_focus}
                      onValueChange={(val) => setConfig({ ...config, auto_camera_focus: val })}
                      trackColor={{ false: '#233148', true: COLORS.cyan }}
                      thumbColor="#fff"
                    />
                  </View>
                </GlassCard>
              </>
            )}

            {activeTab === 'emotes' && (
              <>
                <GlassCard glow="cyan">
                  <Text style={styles.sectionTitle}>Mapeamento de Emotes & Músicas</Text>
                  <Text style={styles.cardDesc}>
                    Cada emote possui um ID de Animação (Loja do Avatar) e um som/música contínuo que
                    toca sem parar até trocar de jogador!
                  </Text>

                  {Object.entries(config.emotes || {}).map(([key, item]) => (
                    <View key={key} style={styles.emoteBox}>
                      <View style={styles.emoteHeader}>
                        <Text style={styles.emoteTitle}>{item.name}</Text>
                        <Text style={styles.emoteKey}>#{key}</Text>
                      </View>
                      <GlassInput
                        label="ID da Animação (Loja do Avatar)"
                        value={item.anim_id}
                        onChangeText={(val) => {
                          const updated = { ...config.emotes };
                          updated[key] = { ...item, anim_id: val };
                          setConfig({ ...config, emotes: updated });
                        }}
                      />
                      <GlassInput
                        label="ID da Música de Fundo (Roblox Sound)"
                        value={item.music_id}
                        onChangeText={(val) => {
                          const updated = { ...config.emotes };
                          updated[key] = { ...item, music_id: val };
                          setConfig({ ...config, emotes: updated });
                        }}
                      />
                      <GlassInput
                        label="Palavras-Chave de Gatilho (Chat solto)"
                        value={item.keywords?.join(', ')}
                        onChangeText={(val) => {
                          const updated = { ...config.emotes };
                          updated[key] = {
                            ...item,
                            keywords: val.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
                          };
                          setConfig({ ...config, emotes: updated });
                        }}
                      />
                    </View>
                  ))}
                </GlassCard>
              </>
            )}

            {activeTab === 'sounds' && (
              <>
                <GlassCard glow="magenta">
                  <Text style={styles.sectionTitle}>Sons Oficiais & Avaliação de Aura</Text>
                  <Text style={styles.cardDesc}>
                    Configure os IDs de som (rbxassetid://...) reproduzidos nos eventos da live e
                    nas notas do avaliador de Aura.
                  </Text>

                  <GlassInput
                    label="Spawn Sound"
                    sublabel="Efeito sonoro ao nascer no palco"
                    value={config.sound_settings.spawn_sound}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, spawn_sound: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Aura Roleta / Analisando"
                    sublabel="Efeito durante o cálculo da Aura (1.8s)"
                    value={config.sound_settings.aura_calc}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, aura_calc: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Aura 8 - 10 (Divina / Mítica / Lendária)"
                    value={config.sound_settings.aura_8_10}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, aura_8_10: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Aura 5 - 7 (Rara / Dourada)"
                    value={config.sound_settings.aura_5_7}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, aura_5_7: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Aura 4 - 3 (Básica / Normal)"
                    value={config.sound_settings.aura_4_3}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, aura_4_3: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Aura 2 - 0 (Pobre / Noob)"
                    value={config.sound_settings.aura_2_0}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, aura_2_0: val },
                      })
                    }
                  />
                  <GlassInput
                    label="Divine Size (Som Gigante Supremo)"
                    value={config.sound_settings.divine_size}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        sound_settings: { ...config.sound_settings, divine_size: val },
                      })
                    }
                  />
                </GlassCard>
              </>
            )}

            {activeTab === 'gifts' && (
              <>
                <GlassCard glow="magenta">
                  <Text style={styles.sectionTitle}>Tamanhos dos Presentes & Boost de Aura</Text>
                  <Text style={styles.cardDesc}>
                    Controle quanto o avatar cresce de escala e quanto ganha de nota de Aura ao
                    receber cada presente.
                  </Text>

                  {Object.entries(config.gift_settings || {}).map(([gkey, gval]) => (
                    <View key={gkey} style={styles.giftCard}>
                      <View style={styles.giftHeader}>
                        <Text style={styles.giftName}>{gkey.toUpperCase()}</Text>
                        <View style={styles.scaleTag}>
                          <Text style={styles.scaleTagText}>{gval.scale}x</Text>
                        </View>
                      </View>
                      <View style={styles.giftInputsRow}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                          <GlassInput
                            label="Escala (Tamanho)"
                            value={String(gval.scale)}
                            onChangeText={(val) => {
                              const updated = { ...config.gift_settings };
                              updated[gkey] = { ...gval, scale: parseFloat(val) || 1.0 };
                              setConfig({ ...config, gift_settings: updated });
                            }}
                            keyboardType="numeric"
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <GlassInput
                            label="Aura Boost (+)"
                            value={String(gval.aura_boost)}
                            onChangeText={(val) => {
                              const updated = { ...config.gift_settings };
                              updated[gkey] = { ...gval, aura_boost: parseFloat(val) || 0.0 };
                              setConfig({ ...config, gift_settings: updated });
                            }}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </GlassCard>
              </>
            )}

            {activeTab === 'camera' && (
              <>
                <GlassCard glow="cyan">
                  <Text style={styles.sectionTitle}>Câmera Cinematográfica</Text>
                  <GlassInput
                    label="Velocidade Orbital (Graus/s)"
                    value={String(config.camera_settings.orbit_speed)}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        camera_settings: {
                          ...config.camera_settings,
                          orbit_speed: parseFloat(val) || 24,
                        },
                      })
                    }
                    keyboardType="numeric"
                  />
                  <GlassInput
                    label="Distância da Câmera (Studs)"
                    value={String(config.camera_settings.distance)}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        camera_settings: {
                          ...config.camera_settings,
                          distance: parseFloat(val) || 8.5,
                        },
                      })
                    }
                    keyboardType="numeric"
                  />
                  <GlassInput
                    label="Altura da Câmera (Studs)"
                    value={String(config.camera_settings.height)}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        camera_settings: {
                          ...config.camera_settings,
                          height: parseFloat(val) || 2.4,
                        },
                      })
                    }
                    keyboardType="numeric"
                  />
                  <GlassInput
                    label="Campo de Visão (FOV)"
                    value={String(config.camera_settings.fov)}
                    onChangeText={(val) =>
                      setConfig({
                        ...config,
                        camera_settings: {
                          ...config.camera_settings,
                          fov: parseInt(val) || 65,
                        },
                      })
                    }
                    keyboardType="numeric"
                  />
                </GlassCard>
              </>
            )}

            {activeTab === 'test' && (
              <>
                <GlassCard glow="cyan">
                  <Text style={styles.sectionTitle}>Disparador Rápido de Testes</Text>
                  <GlassInput
                    label="Nick do Roblox"
                    placeholder="Ex: wsvtn23, Linkmon99"
                    value={testNick}
                    onChangeText={setTestNick}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <GlassInput
                    label="Usuário TikTok"
                    value={testUser}
                    onChangeText={setTestUser}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <GlowButton
                    title="🚀 Spawnar Avatar com Skin & Aura"
                    onPress={() =>
                      runTest(
                        { action_type: 'SPAWN', roblox_nick: testNick, tiktok_user: testUser },
                        'Spawn'
                      )
                    }
                    loading={testing}
                  />
                  <GlowButton
                    title="💃 Testar Emote Stadium (Loja) + Música"
                    onPress={() =>
                      runTest(
                        {
                          action_type: 'EMOTE',
                          roblox_nick: testNick,
                          tiktok_user: testUser,
                          emote_key: 'stadium',
                        },
                        'Emote'
                      )
                    }
                    variant="outline"
                  />
                  <GlowButton
                    title="🌹 Testar Presente Rosa (+Escala)"
                    onPress={() =>
                      runTest(
                        {
                          action_type: 'GIFT',
                          roblox_nick: testNick,
                          tiktok_user: testUser,
                          gift_key: 'rose',
                        },
                        'Rosa'
                      )
                    }
                    variant="magenta"
                  />
                  <GlowButton
                    title="👑 Testar Presente Divine Size (3.0x)"
                    onPress={() =>
                      runTest(
                        {
                          action_type: 'GIFT',
                          roblox_nick: testNick,
                          tiktok_user: testUser,
                          gift_key: 'divine',
                        },
                        'Divine'
                      )
                    }
                    variant="emerald"
                  />
                </GlassCard>
              </>
            )}

            {activeTab === 'feed' && (
              <>
                <GlassCard>
                  <Text style={styles.sectionTitle}>Feed de Eventos em Tempo Real</Text>
                  {status?.recent_events && status.recent_events.length > 0 ? (
                    status.recent_events.map((ev, i) => (
                      <View key={i} style={styles.feedItem}>
                        <View style={styles.feedHeader}>
                          <Text style={styles.feedTitle}>{ev.title}</Text>
                          <Text style={styles.feedTime}>{ev.time}</Text>
                        </View>
                        <Text style={styles.feedDesc}>{ev.description}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.emptyText}>
                      Nenhum evento registrado ainda. Aguardando comentários e presentes na live...
                    </Text>
                  )}
                </GlassCard>
              </>
            )}

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

interface TabPillProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}

const TabPill: React.FC<TabPillProps> = ({ label, icon, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabPill, active && styles.tabPillActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={icon}
      size={15}
      color={active ? '#000' : COLORS.textDim}
      style={{ marginRight: 6 }}
    />
    <Text style={[styles.tabPillText, active && styles.tabPillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSub,
    textTransform: 'uppercase',
  },
  saveHeaderBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  saveHeaderGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  saveHeaderText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '800',
  },
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabBarScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 34, 52, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPillActive: {
    backgroundColor: COLORS.cyan,
    borderColor: COLORS.cyan,
  },
  tabPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDim,
  },
  tabPillTextActive: {
    color: '#000',
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textDim,
    marginBottom: 12,
    lineHeight: 18,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 6,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  switchSub: {
    fontSize: 11,
    color: COLORS.textSub,
    marginTop: 2,
  },
  emoteBox: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12,
    marginTop: 10,
  },
  emoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  emoteTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.cyan,
  },
  emoteKey: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSub,
  },
  giftCard: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 10,
    marginTop: 10,
  },
  giftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  giftName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.magenta,
  },
  scaleTag: {
    backgroundColor: 'rgba(255, 0, 127, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 127, 0.4)',
  },
  scaleTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.magenta,
  },
  giftInputsRow: {
    flexDirection: 'row',
  },
  feedItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 10,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  feedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.cyan,
  },
  feedTime: {
    fontSize: 11,
    color: COLORS.textSub,
  },
  feedDesc: {
    fontSize: 12,
    color: COLORS.textMain,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emptyText: {
    color: COLORS.textSub,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 20,
  },
});
