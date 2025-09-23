import { Text, View } from "react-native";
import Signup from "./Components/Signup";
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
      <Signup />
      <Signin />
    </View>
  );
}
