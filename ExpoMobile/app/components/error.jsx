import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#D13438',
  },

  errorIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  errorText: {
    flex: 1,
    color: '#D13438',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});