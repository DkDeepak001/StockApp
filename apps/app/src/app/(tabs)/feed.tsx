import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "~/utils/api";

const FeedScreen = () => {
  const { data } = api.post.all.useQuery()
  return (
    <SafeAreaView>
      <Text className="text-white">FeedScreen</Text>
    </SafeAreaView>
  )
};

export default FeedScreen;


