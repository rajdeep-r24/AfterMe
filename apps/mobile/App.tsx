import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Colors, Spacing, BorderRadius, APP_METADATA } from './src/constants';
import { FoundationHeader, StatusBadge } from './src/components';
import { useApiHealth } from './src/hooks';
import { ApiConfiguration } from './src/services/api';

export default function App() {
  const { status: apiStatus, isChecking, check: retryCheck } = useApiHealth(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBase} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FoundationHeader
          title={APP_METADATA.name}
          subtitle="Mobile foundation is working."
        />

        {/* Status Highlight */}
        <View style={styles.badgeContainer}>
          <StatusBadge label="FOUNDATION READY" variant="success" />
        </View>

        {/* Foundation Info Cards */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>System Specifications</Text>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Framework</Text>
            <Text style={styles.specValue}>Expo SDK {APP_METADATA.expoSdk}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>React Native</Text>
            <Text style={styles.specValue}>0.76.7 (React 18.3.1)</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>TypeScript</Text>
            <Text style={styles.specValue}>Strict (@afterme/shared)</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Android Package</Text>
            <Text style={styles.specValue}>com.afterme.ai</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Platform</Text>
            <Text style={styles.specValue}>{Platform.OS.toUpperCase()}</Text>
          </View>
        </View>

        {/* API Layer Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeader}>Backend API Service</Text>
            <StatusBadge
              label={apiStatus.connected ? 'CONNECTED' : isChecking ? 'CHECKING' : 'IDLE / STANDBY'}
              variant={apiStatus.connected ? 'success' : isChecking ? 'info' : 'neutral'}
            />
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Endpoint</Text>
            <Text style={styles.specValue} numberOfLines={1}>
              {ApiConfiguration.getBaseUrl()}
            </Text>
          </View>

          {apiStatus.latencyMs !== undefined && (
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Latency</Text>
              <Text style={styles.specValue}>
                {apiStatus.connected ? `${apiStatus.latencyMs}ms` : 'Offline / Backend pending'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={retryCheck}
            disabled={isChecking}
            activeOpacity={0.8}
          >
            {isChecking ? (
              <ActivityIndicator color={Colors.textPrimary} size="small" />
            ) : (
              <Text style={styles.actionButtonText}>Ping Backend API</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Branch: feature/expo-mobile-setup • Ready for feature milestones
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    letterSpacing: 0.3,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderFaint,
  },
  specLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  actionButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.bgSecondary,
    borderWidth: 1,
    borderColor: Colors.borderHighlight,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});
