import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        // Validation des champs
        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (!email.includes('@')) {
            setError('Veuillez entrer un email valide');
            return;
        }

        if (password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setIsLoading(true);
        setError('');
    };

    return (
        <>
        <View style={styles.container}>
            
            <Text style={styles.title}>Connexion</Text>
                        {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

            <TouchableOpacity 
                style={[styles.buttonConnexion, isLoading && styles.buttonDisabled]}
                onPress={handleSignIn}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#cbc8c899',
        borderRadius: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
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