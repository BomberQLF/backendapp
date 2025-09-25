import { Text, View } from "react-native";
import Signup from "./Signup";
import Signin from "./Signin";
import AddTask from "./AddTask";
import Task from "./Task";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
            {/* <AddTask  />
      <Task title={"test de tâche"} /> */}
      {/* <Signin /> */}
      {/* <Signup /> */}
      <Signin />
    </View>
  );
}


