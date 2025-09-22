import { Text, View } from "react-native";
import Signin from "./Components/Signin";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Signin />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
