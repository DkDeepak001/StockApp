import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "~/components/commons/post";
import { api } from "~/utils/api";

const FeedScreen = () => {
  const { data, refetch, isRefetching } = api.post.all.useQuery()
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={data}
        refreshing={isRefetching}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => <Post {...item} />}
        estimatedItemSize={100}
      />
    </SafeAreaView>
  )
};




export default FeedScreen;


