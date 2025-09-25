import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';


export default function AddTask({ onTaskAdded }: { onTaskAdded?: () => void }) {
    const [Task, setTask] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = async () => {
        setError(null);
        const response = await fetch('http://localhost:3000/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        marginTop: 20,
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#cbc8c899',
        borderRadius: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        width: 250,
    },
    buttonConnexion: {
        backgroundColor: '#1100ffff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#59ff00ff',
    },
    buttonText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: '#ffffffff',
        borderColor: '#ff1100ff',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        width: 250,
    },
    errorText: {
        color: '#ff1100ff',
        fontSize: 14,
        textAlign: 'center',
    },
});


// function setError(arg0: null) {
//     throw new Error('Function not implemented.');
// }
// expo router