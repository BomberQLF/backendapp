import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <View style={styles.connectedContainer}>
          {/* Partie gauche : Avatar + Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.greetingText}>Bonjour,</Text>
              <Text style={styles.username}>
                {username}
              </Text>
            </View>
          </View>
          
          {/* Partie droite : Bouton déconnexion */}
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.disconnectedContainer}>
          <Text style={styles.disconnectedIcon}>⚠️</Text>
          <Text style={styles.disconnectedText}>Non connecté</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Conteneur principal - s'adapte au design de TaskList
  container: {
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Layout connecté 
  connectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
    marginRight: 12,
  },
  
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  
  greetingText: {
    fontSize: 13,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  
  // Bouton déconnexion (droite) - compact et circulaire
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  
  logoutIcon: {
    fontSize: 20,
  },
  
  // État déconnecté
  disconnectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  
  disconnectedIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  
  disconnectedText: {
    fontSize: 15,
    color: '#D13438',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});