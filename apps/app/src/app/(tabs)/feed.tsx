import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "~/components/commons/loader";
import Post from "~/components/commons/post";
import { api } from "~/utils/api";

const FeedScreen = () => {
  const [hardRefreshing, setHardRefreshing] = useState<boolean>(false)
  const { data, isLoading, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = api.post.all.useInfiniteQuery({ limit: 4 }, {
    getNextPageParam: (lastPage) => lastPage?.nextCursor
  })

  const handleRefresh = () => {
    try {
      setHardRefreshing(true)
      refetch()
    } catch (error) {
      console.log('error', error)
    } finally {
      setHardRefreshing(false)
    }
  }

  const loadMore = async () => {
    if (hasNextPage) fetchNextPage()
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={data?.pages.map(p => p?.posts).flat()}
        refreshing={hardRefreshing}
        onRefresh={() => handleRefresh()}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => <Post {...item!} />}
        estimatedItemSize={400}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <View className="my-5"><Loader /></View> : null}
        ListHeaderComponent={() => <FeedHeader />}
      />
    </SafeAreaView>
  )
};


const FeedHeader = () => {
  return (
    <View className="h-20 flex flex-row items-center justify-center">
      <Text className="text-white font-extrabold text-center font-mono text-2xl">Feed</Text>
    </View>
  )
}



export default FeedScreen;


