import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../constants';

interface StatusBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'neutral';
}

export function StatusBadge({ label, variant = 'success' }: StatusBadgeProps) {
  const variantStyles = {
    success: {
      bg: Colors.successSubtle,
      border: Colors.success,
      text: Colors.successText,
    },
    warning: {
      bg: Colors.warningSubtle,
      border: Colors.warning,
      text: Colors.warningText,
    },
    info: {
      bg: Colors.infoSubtle,
      border: Colors.info,
      text: Colors.infoText,
    },
    neutral: {
      bg: Colors.bgSecondary,
      border: Colors.borderDefault,
      text: Colors.textSecondary,
    },
  }[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.bg,
          borderColor: variantStyles.border,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: variantStyles.text }]} />
      <Text style={[styles.text, { color: variantStyles.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs + 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
