import { LiveConfig } from './types';

export const DEFAULT_CONFIG: LiveConfig = {
  tiktok_username: 'vt.dapaz22k',
  session_id: '931de8c600efbca3c566ed254e214ff4',
  tt_target_idc: 'useast1a',
  server_port: 3000,
  poll_interval: 0.8,
  avatar_lifetime_seconds: 0,
  max_queue_size: 50,
  auto_camera_focus: true,
  sound_settings: {
    spawn_sound: 'rbxassetid://9069609200',
    aura_calc: 'rbxassetid://9114223171',
    aura_8_10: 'rbxassetid://9069609200',
    aura_5_7: 'rbxassetid://9069609200',
    aura_4_3: 'rbxassetid://9069609200',
    aura_2_0: 'rbxassetid://9069609200',
    divine_size: 'rbxassetid://9069609200'
  },
  gift_settings: {
    rose: { scale: 1.15, aura_boost: 0.3 },
    donut: { scale: 1.45, aura_boost: 0.8 },
    heart: { scale: 1.30, aura_boost: 0.5 },
    galaxy: { scale: 2.00, aura_boost: 2.0 },
    divine: { scale: 3.00, aura_boost: 3.5 }
  },
  camera_settings: {
    orbit_speed: 24,
    distance: 8.5,
    height: 2.4,
    fov: 65
  },
  emotes: {
    stadium: {
      name: 'Stadium',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['stadium', 'palmas', 'torcida', 'estadio']
    },
    salute: {
      name: 'Salute',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['salute', 'continencia', 'militar', 'respeito']
    },
    tilt: {
      name: 'Tilt',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['tilt', 'inclinada', 'lado', 'duvida']
    },
    dance1: {
      name: 'Dança 1',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['dance', 'danca', 'dança', 'bailar', 'dancinha']
    },
    dance2: {
      name: 'Dança 2',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['dance2', 'danca2', 'samba', 'funk']
    },
    cheer: {
      name: 'Comemorar',
      anim_id: '104131847054135',
      music_id: 'rbxassetid://1843404009',
      keywords: ['cheer', 'comemorar', 'festa', 'vitoria', 'top', 'ebaa']
    }
  }
};
