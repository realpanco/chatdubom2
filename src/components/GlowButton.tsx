import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, SHADOWS } from '../theme';

interface GlowButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'magenta' | 'outline' | 'emerald';
  icon?: React.ReactNode;
  loading?: boolean;
  style?: ViewStyle;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  style,
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.7}
        style={[styles.outlineBtn, style]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.cyan} size="small" />
        ) : (
          <>
            {icon}
            <Text style={styles.outlineText}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  const getGradient = () => {
    switch (variant) {
      case 'magenta':
        return ['#FF007F', '#A855F7'] as const;
      case 'emerald':
        return ['#00FF88', '#00F0FF'] as const;
      default:
        return ['#00F0FF', '#0070F3'] as const;
    }
  };

  const getShadow = () => {
    switch (variant) {
      case 'magenta':
        return SHADOWS.magenta;
      default:
        return SHADOWS.cyan;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      activeOpacity={0.8}
      style={[styles.btnWrapper, getShadow(), style]}
    >
      <LinearGradient
        colors={getGradient()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#000" size="small" />
        ) : (
          <>
            {icon}
            <Text style={styles.btnText}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 14,
    marginVertical: 6,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  btnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(16, 22, 34, 0.6)',
    gap: 8,
    marginVertical: 4,
  },
  outlineText: {
    color: COLORS.textMain,
    fontSize: 13,
    fontWeight: '700',
  },
});
