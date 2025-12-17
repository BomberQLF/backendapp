import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";
import ErrorMessage from "./components/error";
import Logo from "./components/logo";
import { styles } from "./components/logindesign";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    // Validation des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (!email.includes("@")) {
      setError("Veuillez entrer un email valide");
      return;
    }

    setIsLoading(true);
    setError("");

    // Envoie des données au backend
    const response = await fetch(`${API_URL}/user/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      // Email ou mot de passe incorrect
      setError(data.message || "Erreur lors de la connexion");
      setIsLoading(false);
    } else {
      // Stocker le token dans AsyncStorage
      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      setIsLoading(false);
      router.push("/TaskList");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Logo />

      <View style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.subtitle}>
            Connectez-vous pour gérer vos tâches
          </Text>
        </View>

        <ErrorMessage message={error} />

        {/* Formulaire */}
        <View style={styles.form}>
          {/* Champ Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, styles.inputContainerFocused]}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                placeholderTextColor="#AAAAAA"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Champ Mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={[styles.inputContainer, styles.inputContainerFocused]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="******"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Bouton de connexion */}
          <TouchableOpacity
            style={[styles.buttonConnexion]}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          {/* Lien vers inscription */}
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Pas de compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/Signup")}>
              <Text style={styles.signupLink}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Fait par Nicolas et Tom</Text>
      </View>
    </ScrollView>
  );
}