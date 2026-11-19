import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  glow?: 'cyan' | 'magenta' | 'emerald' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 40,
  glow = 'none',
}) => {
  const getGlowBorder = () => {
    switch (glow) {
      case 'cyan':
        return COLORS.borderLight;
      case 'magenta':
        return 'rgba(255, 0, 127, 0.35)';
      case 'emerald':
        return 'rgba(0, 255, 136, 0.35)';
      default:
        return COLORS.border;
    }
  };

  return (
    <View style={[styles.container, { borderColor: getGlowBorder() }, style]}>
      <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(14, 20, 32, 0.65)',
    marginVertical: 8,
  },
  content: {
    padding: 18,
  },
});
