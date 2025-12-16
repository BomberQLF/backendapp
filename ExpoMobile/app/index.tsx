import { Text, View } from "react-native";
import Signup from "./Signup";
import Signin from "./Signin";
import AddTask from "./AddTask";
import Task from "./task";
import TaskList from "./TaskList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <TaskList /> */}
      {/* <Signup /> */}
      <Signin />
    </View>
  );
}


