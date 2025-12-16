import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
//utilisation de AsyncStorage pour stocker le token utilisateur


export default function AddTask({ onTaskAdded }: { onTaskAdded?: () => void }) {
    const [Task, setTask] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = async () => {
        setError(null);
        
        // Récupérer le token depuis AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            setError('Non authentifié');
            return;
        }

        const response = await fetch(`${config.API_URL}/task`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: Task }),
        });
        const data = await response.json();
        if (!data.ok) {
            setError(data.error || 'Erreur');
            return;
        }
        setTask('');
        if (onTaskAdded) onTaskAdded();
    };

    return (
        <>
            <View style={styles.containerParent}>
                <View style={styles.container}>

                    <Text style={styles.label}>Tâche</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez votre Tâche"
                        value={Task}
                        onChangeText={setTask}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        style={styles.buttonConnexion}
                        onPress={handleAddTask}
                    >
                        <Text style={styles.buttonText}>Ajouter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    containerParent: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 0,
        marginBottom: 0,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        borderRadius: 0,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        color: '#666666',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 4,
        padding: 12,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#333333',
        fontWeight: '400',
    },
    buttonConnexion: {
        backgroundColor: '#0078d4',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: '#d0d0d0',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#fdeef1',
        borderColor: '#d13438',
        borderLeftWidth: 3,
        borderRadius: 2,
        padding: 12,
        marginBottom: 20,
    },
    errorText: {
        color: '#d13438',
        fontSize: 14,
        textAlign: 'left',
        fontWeight: '500',
    },
});
