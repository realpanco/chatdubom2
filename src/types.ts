export interface CameraSettings {
  orbit_speed: number;
  distance: number;
  height: number;
  fov: number;
}

export interface SoundSettings {
  spawn_sound: string;
  aura_calc: string;
  aura_8_10: string;
  aura_5_7: string;
  aura_4_3: string;
  aura_2_0: string;
  divine_size: string;
}

export interface GiftTier {
  scale: number;
  aura_boost: number;
}

export interface GiftSettings {
  rose: GiftTier;
  donut: GiftTier;
  heart: GiftTier;
  galaxy: GiftTier;
  divine: GiftTier;
  [key: string]: GiftTier;
}

export interface EmoteItem {
  name: string;
  anim_id: string;
  music_id: string;
  keywords: string[];
}

export interface LiveConfig {
  tiktok_username: string;
  session_id: string;
  tt_target_idc: string;
  server_port: number;
  poll_interval: number;
  avatar_lifetime_seconds: number;
  max_queue_size: number;
  auto_camera_focus: boolean;
  camera_settings: CameraSettings;
  sound_settings: SoundSettings;
  gift_settings: GiftSettings;
  emotes: Record<string, EmoteItem>;
}

export interface RecentEvent {
  type: string;
  title: string;
  description: string;
  time: string;
}

export interface LiveStatus {
  is_live: boolean;
  status_message: string;
  username: string;
  total_spawns: number;
  total_emotes: number;
  total_gifts: number;
  recent_events?: RecentEvent[];
}
