import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme';
import { LiveStatus } from '../types';

interface LiveStatusHeaderProps {
  status: LiveStatus | null;
  serverUrl: string;
}

export const LiveStatusHeader: React.FC<LiveStatusHeaderProps> = ({ status, serverUrl }) => {
  const isOnline = status?.is_live ?? false;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.statusPill}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: isOnline ? COLORS.emerald : COLORS.magenta,
                shadowColor: isOnline ? COLORS.emerald : COLORS.magenta,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {status ? (isOnline ? `AO VIVO • @${status.username}` : status.status_message) : 'Conectando ao Bridge...'}
          </Text>
        </View>

        <View style={styles.serverPill}>
          <Text style={styles.serverPillText} numberOfLines={1}>
            {serverUrl.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Spawns</Text>
          <Text style={[styles.metricValue, { color: COLORS.cyan }]}>
            {status?.total_spawns ?? 0}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Emotes</Text>
          <Text style={[styles.metricValue, { color: COLORS.gold }]}>
            {status?.total_emotes ?? 0}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Presentes</Text>
          <Text style={[styles.metricValue, { color: COLORS.magenta }]}>
            {status?.total_gifts ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 24, 38, 0.85)',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  statusText: {
    color: COLORS.textMain,
    fontSize: 12,
    fontWeight: '700',
    flexShrink: 1,
  },
  serverPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  serverPillText: {
    color: COLORS.textDim,
    fontSize: 11,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(14, 20, 32, 0.75)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSub,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
  },
});
