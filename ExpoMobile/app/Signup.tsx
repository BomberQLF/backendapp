import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "./config";
import ErrorMessage from "./components/error";
import Logo from "./components/logo";
import { styles } from "./components/logindesign";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setError("");
    setIsLoading(true);

    // Envoie des données au backend
    const response = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    const data = await response.json();
    if (!data.ok) {
      setError(data.message || "Erreur lors de l'inscription");
    } else {
      router.push("/"); // Redirige vers la page d'accueil ou de connexion
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Logo />

      {/* Carte d'inscription */}
      <View style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Commencez à organiser vos tâches</Text>
        </View>

        <ErrorMessage message={error} />

        {/* Formulaire */}
        <View style={styles.form}>
          {/* Champ Nom d'utilisateur */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <View style={[styles.inputContainer, styles.inputContainerFocused]}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Pseudonyme"
                placeholderTextColor="#AAAAAA"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

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

          {/* Champ Confirmer mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <View style={[styles.inputContainer, styles.inputContainerFocused]}>
              <Text style={styles.inputIcon}>🔐</Text>
              <TextInput
                style={styles.input}
                placeholder="******"
                placeholderTextColor="#AAAAAA"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Bouton d'inscription */}
          <TouchableOpacity
            style={[styles.buttonConnexion]}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Créer mon compte</Text>
          </TouchableOpacity>

          {/* Lien vers connexion */}

          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => router.push("/Signin")}>
              <Text style={styles.signupLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Fait par Nicolas et Tom
        </Text>
      </View>
    </ScrollView>
  );
}
//   wrapper: {
//     flex: 1,
//     backgroundColor: '#FAFBFC',
//   },

//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//   },

//   decorativeHeader: {
//     alignItems: 'center',
//     marginBottom: 32,
//     position: 'relative',
//     height: 120,
//     justifyContent: 'center',
//   },

//   decorativeCircle1: {
//     position: 'absolute',
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#E5FFE5',
//     top: 0,
//     left: '20%',
//     opacity: 0.6,
//   },

//   decorativeCircle2: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#FFF4E5',
//     top: 20,
//     right: '25%',
//     opacity: 0.6,
//   },

//   logoEmoji: {
//     fontSize: 64,
//     zIndex: 1,
//   },

//   container: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 28,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//     maxWidth: 500,
//     width: '100%',
//     alignSelf: 'center',
//   },

//   header: {
//     marginBottom: 28,
//     alignItems: 'center',
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#1A1A1A',
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },

//   subtitle: {
//     fontSize: 15,
//     color: '#999999',
//     fontWeight: '500',
//     letterSpacing: 0.2,
//   },

//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFE5E5',
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 20,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FF6B9D',
//   },

//   errorIcon: {
//     fontSize: 20,
//     marginRight: 10,
//   },

//   errorText: {
//     flex: 1,
//     color: '#D13438',
//     fontSize: 14,
//     fontWeight: '600',
//     letterSpacing: 0.2,
//   },

//   form: {
//     width: '100%',
//   },

//   inputGroup: {
//     marginBottom: 20,
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 8,
//     letterSpacing: 0.3,
//     textTransform: 'uppercase',
//   },

//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     borderWidth: 2,
//     borderColor: '#F0F0F0',
//   },

//   inputContainerFocused: {
//     borderColor: '#FF6B9D',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#FF6B9D',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },

//   inputIcon: {
//     fontSize: 20,
//     marginRight: 12,
//   },

//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1A1A1A',
//     fontWeight: '500',
//     paddingVertical: 12,
//   },

//   buttonConnexion: {
//     backgroundColor: '#FF6B9D',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 8,
//     shadowColor: '#FF6B9D',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 6,
//   },

//   buttonConnexionDisabled: {
//     backgroundColor: '#E0E0E0',
//     shadowOpacity: 0,
//   },

//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//     fontSize: 17,
//     letterSpacing: 0.5,
//   },

//   signinSection: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//     gap: 6,
//   },

//   signinText: {
//     fontSize: 15,
//     color: '#666666',
//     fontWeight: '500',
//   },

//   signinLink: {
//     fontSize: 15,
//     color: '#FF6B9D',
//     fontWeight: '700',
//     letterSpacing: 0.2,
//   },

//   footer: {
//     marginTop: 32,
//     alignItems: 'center',
//   },

//   footerText: {
//     fontSize: 13,
//     color: '#AAAAAA',
//     fontWeight: '500',
//     letterSpacing: 0.5,
//   },
// });
