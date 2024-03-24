import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation, useSegments } from 'expo-router'
import { api } from '~/utils/api'
import { StockDetails, HashtagDetails } from '~/components/hashtag/header'
import { Image } from 'expo-image'
import { parseValue } from 'react-native-controlled-mentions'
import { renderPart } from '~/components/post/postDetails'
import Loader from '~/components/commons/loader'
const Tags = () => {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const { data: tag, isLoading, refetch, isRefetching, isInitialLoading } = api.hashTag.byId.useQuery({ id: id as string })
  const segement = useSegments()[0]

  useEffect(() => {
    if (!tag) return
    navigation.setOptions({
      title: tag?.name?.[0]?.toUpperCase()! + tag?.name?.slice(1)! ?? ""
    })
  }, [])

  if (isLoading) {
    return <Loader />
  }
  if (!tag) return
  return (
    <FlatList
      ListHeaderComponent={
        <>
          {tag?.isStock ? <StockDetails {...tag.stock!} /> : <HashtagDetails {...tag} />}
          <Text className='text-white font-bold text-2xl my-1 px-10'>Posts about {tag.name}</Text>
        </>
      }
      data={tag.posts ?? []}
      contentContainerStyle={{
        width: '100%',
        rowGap: 20
      }}
      refreshing={!isInitialLoading && isRefetching}
      onRefresh={refetch}
      renderItem={({ item }) => {
        const { parts } = parseValue(item.post?.description!, [{ trigger: "#" }])
        return (
          <Pressable className='flex flex-row gap-x-4 w-10/12 px-10'
            onPress={() => router.push(`/post/${item.postId}`)}
          >
            <Image source={{ uri: item.post?.files?.[0]?.url! }} className='h-20 w-20 rounded-lg' />
            <View className='gap-y-1 justify-center'>
              <Text className='text-white font-bold text-xl' numberOfLines={1} ellipsizeMode='tail'>{item.post?.tittle}</Text>
              <Text className='text-white font-light text-sm,' numberOfLines={1} ellipsizeMode='tail'>{parts.map((p, i) => renderPart(p, i, segement!))}</Text>
              <Text className='text-white font-light text-sm,' numberOfLines={1} ellipsizeMode='tail'>{item.post.fromNow}</Text>
            </View>
          </Pressable>
        )
      }}
    />
  )
}

export default Tags 
