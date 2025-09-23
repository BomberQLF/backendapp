import { Text, View } from "react-native";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import AddTask from "./Components/AddTask";
import Task from "./Components/Task";

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


