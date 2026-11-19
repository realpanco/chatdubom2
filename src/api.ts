import AsyncStorage from '@react-native-async-storage/async-storage';
import { LiveConfig, LiveStatus } from './types';
import { DEFAULT_CONFIG } from './defaultConfig';

const STORAGE_KEY_SERVER_IP = '@roblox_live_server_ip';
const STORAGE_KEY_CONFIG = '@roblox_live_config';

export class ApiService {
  private static serverUrl: string = 'http://127.0.0.1:3000';

  public static async initServerUrl(): Promise<string> {
    const saved = await AsyncStorage.getItem(STORAGE_KEY_SERVER_IP);
    if (saved) {
      this.serverUrl = saved.trim().replace(/\/+$/, '');
    }
    return this.serverUrl;
  }

  public static async setServerUrl(url: string): Promise<void> {
    let cleaned = url.trim().replace(/\/+$/, '');
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'http://' + cleaned;
    }
    this.serverUrl = cleaned;
    await AsyncStorage.setItem(STORAGE_KEY_SERVER_IP, cleaned);
  }

  public static getServerUrl(): string {
    return this.serverUrl;
  }

  public static async getStatus(): Promise<LiveStatus | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${this.serverUrl}/api/status`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) return null;
      return (await res.json()) as LiveStatus;
    } catch {
      return null;
    }
  }

  public static async getConfig(): Promise<LiveConfig> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${this.serverUrl}/api/config`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const config = (await res.json()) as LiveConfig;
        await AsyncStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
        return { ...DEFAULT_CONFIG, ...config };
      }
    } catch {}

    const localCached = await AsyncStorage.getItem(STORAGE_KEY_CONFIG);
    if (localCached) {
      try {
        return { ...DEFAULT_CONFIG, ...JSON.parse(localCached) };
      } catch {}
    }
    return DEFAULT_CONFIG;
  }

  public static async saveConfig(config: LiveConfig): Promise<boolean> {
    await AsyncStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    try {
      const res = await fetch(`${this.serverUrl}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public static async triggerTestEvent(payload: Record<string, any>): Promise<boolean> {
    try {
      const res = await fetch(`${this.serverUrl}/api/test_event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
