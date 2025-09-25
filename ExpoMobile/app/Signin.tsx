import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";
import { useRouter } from "expo-router";

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

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);
    setError("");
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Se connecter</Text>
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
          
          style={{ marginBottom: 20, marginTop: 10, alignSelf: 'flex-end' }}
        >
          <Button title="Créer un compte" onPress={() => router.push('/Signup')}></Button>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonConnexion]}
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
    width: "60%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    paddingTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonConnexion: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#ffffffff",
    borderColor: "#ff1100ff",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#ff1100ff",
    fontSize: 14,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
});