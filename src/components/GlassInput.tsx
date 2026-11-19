import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS } from '../theme';

interface GlassInputProps extends TextInputProps {
  label: string;
  sublabel?: string;
  badge?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  sublabel,
  badge,
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={COLORS.textSub}
        selectionColor={COLORS.cyan}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sublabel: {
    fontSize: 11,
    color: COLORS.textSub,
    marginBottom: 6,
  },
  badge: {
    backgroundColor: 'rgba(0, 240, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.cyan,
  },
  input: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textMain,
    fontSize: 14,
    fontFamily: 'System',
  },
});
