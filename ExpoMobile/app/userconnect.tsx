import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function UserConnect() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUsername(user.username || null);
        }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      setUsername(null);
      router.push('/');
  };

  return (
    <View style={styles.container}>
      {username ? (
        <>
          <Text style={styles.connectedText}>
            👤 Connecté en tant que <Text style={styles.username}>{username}</Text>
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.disconnectedText}>⚠️ Non connecté</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  username: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  disconnectedText: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ff6b6b',
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});