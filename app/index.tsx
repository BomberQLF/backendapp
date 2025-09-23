import { Text, View } from "react-native";
import Signup from "./Components/Signup";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Signup />
    </View>
  );
}
