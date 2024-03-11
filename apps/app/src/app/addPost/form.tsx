import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BasicInput } from "~/components/commons/textInput";

const FormScreen = () => {
  console.log("form page")
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 flex items-center">
        <BasicInput placeholder="Title" />
      </View>
    </ScrollView>
  )
};

export default FormScreen;



