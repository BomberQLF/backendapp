import { Text, View } from "react-native";
import Signup from "./Signup";
import Signin from "./Signin";
import AddTask from "./AddTask";
import Task from "./task";
import TaskList from "./TaskList";
import UserConnect from "./userconnect";

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
    </View>
  );
}


