import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { ArrayElement } from "~/components/commons/post";
import { api } from "~/utils/api";
import * as Linking from 'expo-linking';

const NewsScreen = () => {
  const { data: news, isRefetching, refetch } = api.news.all.useQuery({})
  console.log(news?.articles.length, news?.totalResults, 'news')
  return (
    <FlashList
      style={{
      }}
      refreshing={isRefetching}
      onRefresh={refetch}
      data={news?.articles}
      renderItem={({ item }) => <NewsCard {...item} />}
      ItemSeparatorComponent={() => <View className="h-2" />}
      estimatedItemSize={10}
    />
  )
};

type NewsCardProps = ArrayElement<NonNullable<ReturnType<ReturnType<typeof api.useUtils>['news']['all']['getData']>>['articles']>
const NewsCard = (item: NewsCardProps) => {
  return (
    <Pressable className="h-64 px-2" onPress={() => Linking.openURL(item.url)}>
      <Image source={{ uri: item.urlToImage }} className="h-full w-full rounded-xl opacity-40" />
      <View className="absolute px-2 bottom-0">
        <Text className="text-white text-lg font-bold pl-2 pb-2">{item.title}</Text>
      </View>
    </Pressable>
  )
}

export default NewsScreen;

