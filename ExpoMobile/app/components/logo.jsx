import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Logo() {

  return (
     <View style={styles.decorativeHeader}>
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <Text style={styles.logoEmoji}>📝</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  decorativeHeader: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
    height: 120,
    justifyContent: "center",
  },

  decorativeCircle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f5b4b4ff",
    top: 0,
    left: "20%",
    opacity: 0.6,
  },

  decorativeCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#84b9e7ff",
    top: 20,
    right: "25%",
    opacity: 0.6,
  },

  logoEmoji: {
    fontSize: 64,
    zIndex: 1,
  },
});