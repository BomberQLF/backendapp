import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

export default function AddList({ onListAdded }: { onListAdded?: () => void }) {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddList = async () => {
        setError(null);
        // recupérer le token utilisateur depuis AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            setError('Non authentifié');
            return;
        }

            const response = await fetch(`${API_URL}/list`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name }),
            });
            
            const data = await response.json();
            
            if (!data.ok) {
                setError(data.error || 'Erreur lors de la création de la liste');
                return;
            }
            
            setName('');
            if (onListAdded) onListAdded();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerIcon}>📁</Text>
                    <Text style={styles.headerText}>Nouvelle catégorie</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de la catégorie..."
                        placeholderTextColor="#AAAAAA"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        onSubmitEditing={handleAddList}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, (!name) && styles.buttonDisabled]}
                        onPress={handleAddList}
                        disabled={!name}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>
                        Créer la catégorie
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        letterSpacing: -0.3,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
        borderWidth: 2,
        borderColor: '#F0F0F0',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#E0E0E0',
        shadowOpacity: 0,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    }
});