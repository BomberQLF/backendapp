import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FAFBFC",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  // Carte principale
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },

  // En-tête de la carte
  header: {
    marginBottom: 28,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#999999",
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  // Formulaire
  form: {
    width: "100%",
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },

  inputContainerFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
    paddingVertical: 12,
  },

  // Bouton de connexion
  buttonConnexion: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonConnexionDisabled: {
    backgroundColor: "#E0E0E0",
    shadowOpacity: 0,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.5,
  },

  // Section inscription
  signupSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 6,
  },

  signupText: {
    fontSize: 15,
    color: "#666666",
    fontWeight: "500",
  },

  signupLink: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
    footer: {
    marginTop: 32,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 13,
    color: '#AAAAAA',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});